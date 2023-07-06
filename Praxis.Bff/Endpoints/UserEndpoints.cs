using System.Security.Claims;
using Praxis.Bff.Models;

namespace Praxis.Bff.Endpoints
{
    public static class UserEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/api/user", (ClaimsPrincipal user) =>
            {
                string? name = user?.GetName();
                string? email = user?.GetEmail();

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
        }
    }
}
