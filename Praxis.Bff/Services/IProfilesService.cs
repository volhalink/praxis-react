namespace Praxis.Bff.Services
{
    public interface IProfilesService
    {
        Task<bool> AddProfileAsync(string email, string? name);
    }
}
