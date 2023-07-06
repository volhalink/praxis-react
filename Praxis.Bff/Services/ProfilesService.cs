﻿using MongoDB.Bson;
using MongoDB.Driver;
using Praxis.Bff.Models;

namespace Praxis.Bff.Services
{
    public class ProfilesService : IProfilesService, IHabitsService
    {
        private readonly IMongoCollection<ProfileDto> _profilesCollection;

        public ProfilesService(IMongoDatabase mongoDatabase, string profilesCollectionName)
        {
            _profilesCollection = mongoDatabase.GetCollection<ProfileDto>(profilesCollectionName);
        }

        public async Task<bool> AddProfileAsync(string email, string? name)
        {
            var updateDefinition = Builders<ProfileDto>.Update
                .SetOnInsert(p => p.Email, email)
                .SetOnInsert(p => p.Name, name ?? email);

            var result = await _profilesCollection.UpdateOneAsync(p => p.Email == email, updateDefinition, new UpdateOptions { IsUpsert = true });

            return result.IsAcknowledged;
        }

        public IList<Habit> GetHabits(string email)
        {
            var filter = Builders<ProfileDto>.Filter.Eq(p=> p.Email, email);
            var projection = Builders<ProfileDto>.Projection.Include("habbits._id").Include("habbits.name");
            var habbits = _profilesCollection.Find(filter).Project<ProfileDto>(projection).FirstOrDefault()?.Habits?.Select(h=> new Habit
            {
                Id = h.Id,
                Name = h.Name
            }).ToList();

            return habbits ?? new List<Habit>();
        }

        public async Task<Habit?> AddHabitAsync(string email, Habit habbit)
        {
            var newHabbit = new HabitDto
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Name = habbit.Name,
            };
            var updateDefinition = Builders<ProfileDto>.Update.AddToSet<HabitDto>(p => p.Habits, newHabbit);
            var result = await _profilesCollection.UpdateOneAsync(p => p.Email == email, updateDefinition);

            return result.IsAcknowledged? new Habit
            {
                Id = newHabbit.Id,
                Name = newHabbit.Name,
            } : null;
        }
    }
}
