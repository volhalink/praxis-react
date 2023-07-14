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

        public static string? GetName(this ClaimsPrincipal user)
        {
            string? name = user?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            return name;
        }
    }
}
