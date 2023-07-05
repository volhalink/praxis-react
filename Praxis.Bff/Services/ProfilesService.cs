using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Praxis.Bff.Services
{
    public class ProfilesService
    {
        private readonly IMongoCollection<Profile> _profilesCollection;

        public ProfilesService(IOptions<PraxisDatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

            _profilesCollection = mongoDatabase.GetCollection<Profile>(databaseSettings.Value.ProfilesCollectionName);
        }

        public async Task<bool> AddOrUpdateProfile(string name, string email)
        {
            var updateDefinition = Builders<Profile>.Update.Set(p => p.Name, name)
                .SetOnInsert(p => p.Email, email);

            var result = await _profilesCollection.UpdateOneAsync(p => p.Email == email, updateDefinition, new UpdateOptions { IsUpsert = true });

            return result.IsAcknowledged;
        }
    }
}
