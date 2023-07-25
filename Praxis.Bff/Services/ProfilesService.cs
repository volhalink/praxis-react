using MongoDB.Bson;
using MongoDB.Driver;
using Praxis.Bff.Models;

namespace Praxis.Bff.Services
{
    public class ProfilesService : IProfilesService
    {
        private readonly IMongoCollection<ProfileDto> _profilesCollection;

        public ProfilesService(IMongoCollection<ProfileDto> profilesCollection)
        {
            _profilesCollection = profilesCollection;
        }

        public Profile? GetProfile(string email)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email);
            ProjectionDefinition<ProfileDto, ProfileDto> projection = Builders<ProfileDto>.Projection
                .Include(p => p.Email)
                .Include(p => p.Name)
                .Include(p => p.Picture)
                .Include(p => p.Locale)
                .Include(p => p.Timezone);

            var profileDto = _profilesCollection
                .Find(filter)
                .Project(projection).FirstOrDefault();

            return profileDto.ToModel();
        }

        public async Task<Profile?> AddProfileAsync(Profile profile)
        {
            var locale = string.IsNullOrEmpty(profile.Locale) ? "en" : profile.Locale;
            var timezone = string.IsNullOrEmpty(profile.Timezone) ? "UTC" : profile.Timezone;
            var updateDefinition = Builders<ProfileDto>.Update
                .SetOnInsert(p => p.Email, profile.Email)
                .SetOnInsert(p => p.Name, profile.Name ?? profile.Email)
                .SetOnInsert(p => p.Picture, profile.Picture)
                .SetOnInsert(p => p.Locale, locale)
                .SetOnInsert(p => p.Timezone, timezone);

            var result = await _profilesCollection.UpdateOneAsync(p => p.Email == profile.Email, updateDefinition, new UpdateOptions { IsUpsert = true });
            Profile newProfile = null;
            if (result.IsAcknowledged)
            {
                newProfile = GetProfile(profile.Email);
            }

            return newProfile;
        }

        public async Task<Profile?> SetTimezoneAsync(string email, string timezone)
        {
            var updateDefinition = Builders<ProfileDto>.Update
                .Set(p => p.Timezone, timezone);

            var result = await _profilesCollection.UpdateOneAsync(p => p.Email == email, updateDefinition);
            Profile? updatedProfile = null;
            if (result.IsAcknowledged)
            {
                updatedProfile = GetProfile(email);
            }

            return updatedProfile;
        }
    }
}
