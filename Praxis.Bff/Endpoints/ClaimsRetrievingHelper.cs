using Praxis.Bff.Models;
using System.Security.Claims;

namespace Praxis.Bff.Endpoints
{
    public static class ClaimsRetrievingHelper
    {
        public static string? GetEmail(this ClaimsPrincipal user)
        {
            string? email = user?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            return email;
        }

        private static string? GetName(this ClaimsPrincipal user)
        {
            string? name = user?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            return name;
        }

        private static string? GetPictureUrl(this ClaimsPrincipal user)
        {
            string? picture = user?.Claims?.FirstOrDefault(c => c.Type == "urn:google:picture")?.Value;
            return picture;
        }

        private static string? GetLocale(this ClaimsPrincipal user)
        {
            string? locale = user?.Claims?.FirstOrDefault(c => c.Type == "urn:google:locale")?.Value;
            return locale;
        }

        public static Profile GetProfile(this ClaimsPrincipal user)
        {
            var email = user?.GetEmail();
            var name = user?.GetName();
            var picture = user?.GetPictureUrl();
            var locale = user?.GetLocale();
            var profile = new Profile()
            {
                Email = email,
                Name = name,
                Picture = picture,
                Locale = locale,
            };

            return profile;
        }
    }
}
