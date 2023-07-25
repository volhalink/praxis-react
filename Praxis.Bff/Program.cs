using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.HttpOverrides;
using MongoDB.Driver;
using Praxis.Bff.Endpoints;
using Praxis.Bff.Services;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up");

try
{
    var builder = WebApplication.CreateBuilder(args);
    builder.Host.UseSerilog((ctx, lc) => lc
        .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
        .Enrich.FromLogContext()
        .ReadFrom.Configuration(ctx.Configuration));

    var mongoClient = new MongoClient(builder.Configuration["MongoDB:ConnectionString"]);
    var mongoDatabase = mongoClient.GetDatabase(builder.Configuration["MongoDB:DatabaseName"]);
    var profilesCollection = mongoDatabase.GetCollection<ProfileDto>(builder.Configuration["MongoDB:ProfilesCollectionName"]);

    builder.Services.AddSingleton<IMongoCollection<ProfileDto>>(profilesCollection);
    var profilesService = new ProfilesService(profilesCollection);

    builder.Services.AddSingleton<IProfilesService>(profilesService);
    builder.Services.AddSingleton<IHabitsService, HabitsService>();
    builder.Services.AddSingleton<IHabitsProgressService, HabitsProgressService>();
    builder.Services.AddSingleton<ITimezonesService, TimezonesService>();

    builder.Services
        .AddAuthentication(options =>
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
        })
        .AddCookie(options =>
        {
            options.Events.OnSignedIn = async (context) =>
            {
                var email = context.Principal?.GetEmail();
                if (!string.IsNullOrWhiteSpace(email) && context.Principal != null)
                {
                    var profile = context.Principal.GetProfile();
                    await profilesService.AddProfileAsync(profile);
                }
            };
        })
        .AddGoogle(googleOptions =>
        {
            googleOptions.ClientId = builder.Configuration["Authentication:Google:ClientId"];
            googleOptions.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
            googleOptions.Scope.Add("https://www.googleapis.com/auth/userinfo.profile");

            googleOptions.ClaimActions.MapJsonKey("urn:google:picture", "picture", "url");
            googleOptions.ClaimActions.MapJsonKey("urn:google:locale", "locale", "string");
            googleOptions.ClaimActions.MapJsonKey("urn:google:zoneinfo", "zoneinfo", "string"); // zoneinfo
            //googleOptions.UsePkce = true;
        });

    builder.Services.AddAuthorization();

    builder.Services.Configure<ForwardedHeadersOptions>(options =>
    {
        options.ForwardedHeaders = ForwardedHeaders.All;
    });

    var app = builder.Build();

    //app.UsePathBase("/api/");
    app.UseHttpLogging();
    app.UseForwardedHeaders();

    app.UseAuthentication();
    app.UseAuthorization();

    LoginEndpoints.Map(app);
    ProfileEndpoints.Map(app);
    HabitsEndpoints.Map(app);
    HabitsProgressEndpoints.Map(app);

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}