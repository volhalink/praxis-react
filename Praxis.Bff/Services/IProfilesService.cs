using Praxis.Bff.Models;

namespace Praxis.Bff.Services
{
    public interface IProfilesService
    {
        Profile? GetProfile(string email);

        Task<Profile?> AddProfileAsync(Profile profile);

        Task<Profile?> SetTimezoneAsync(string email, string timezone);
    }
}
