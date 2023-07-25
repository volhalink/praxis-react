using Praxis.Bff.Services;
using System.Security.Claims;

namespace Praxis.Bff.Endpoints
{
    public static class ProfileEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/api/user", (ClaimsPrincipal user, IProfilesService profilesService) =>
            {
                var email = user?.GetEmail();
                if (string.IsNullOrEmpty(email)) return null;

                var profile = profilesService.GetProfile(email);
                if (profile != null)
                {
                    profile.IsLoggedIn = true;
                }
                return profile;
            });

            app.MapPost("api/user/settimezone", async(string timezone, ClaimsPrincipal user, ITimezonesService timezonesService, IProfilesService profilesService) =>
            {
                var email = user?.GetEmail();
                if(!string.IsNullOrEmpty(email) && timezonesService.IsSupported(timezone))
                {
                    return await profilesService.SetTimezoneAsync(email, timezone);
                }

                return null;
            });
        }
    }
}
