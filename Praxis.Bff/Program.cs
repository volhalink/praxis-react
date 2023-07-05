using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Praxis.Bff.Models;
using Praxis.Bff.Services;
using Serilog;
using System;
using System.Security.Claims;

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

    builder.Services.Configure<PraxisDatabaseSettings>(
    builder.Configuration.GetSection("MongoDB"));
    builder.Services.AddSingleton<ProfilesService>();

    builder.Services
        .AddAuthentication(options =>
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
        })
        .AddCookie()
        .AddGoogle(googleOptions =>
        {
            googleOptions.ClientId = builder.Configuration["Authentication:Google:ClientId"];
            googleOptions.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
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

    app.MapGet("/api/login/google", () =>
    {
        var properties = new GoogleChallengeProperties
        {
            RedirectUri = "/api/setuser",
            Prompt = "select_account"
        };

        return Results.Challenge(properties, new[] { GoogleDefaults.AuthenticationScheme });
    });

    app.MapGet("/api/logout", () =>
    {
        var properties = new AuthenticationProperties
        {
            RedirectUri = "/"
        };

        return Results.SignOut(properties, new[] { CookieAuthenticationDefaults.AuthenticationScheme });
    });

    app.MapGet("/api/setuser", async (ClaimsPrincipal user, ProfilesService profilesService) =>
    {
        string? name = user?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
        string? email = user?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

        if (!string.IsNullOrWhiteSpace(email))
        {
            await profilesService.AddOrUpdateProfile(name ?? email, email);
        }

        return Results.Redirect("/");
    });

    app.MapGet("/api/user", (ClaimsPrincipal user) => {
        string? name = user?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
        string? email = user?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

        if (string.IsNullOrWhiteSpace(email))
        {
            return null;
        }

        return new User
        {
            Name = name ?? string.Empty,
            Email = email,
        };
        });

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