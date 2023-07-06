using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Praxis.Bff.Services;
using System.Security.Claims;

namespace Praxis.Bff.Endpoints
{
    public static class LoginEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/api/login/google", () =>
            {
                var properties = new GoogleChallengeProperties
                {
                    RedirectUri = "/",
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
        }
    }
}
