using MongoDB.Bson;
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
            var habits = _profilesCollection.Find(filter).FirstOrDefault()?.Habits?.Select(h=> h.ToModel())?.ToList();

            return habits ?? new List<Habit>();
        }

        public Habit? GetHabit(string email, string habitId)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email)
                & Builders<ProfileDto>.Filter.ElemMatch(p => p.Habits, h => h.Id == habitId);
            var projection = Builders<ProfileDto>.Projection.Expression(p => p.Habits.Where(h => h.Id == habitId));

            var habitDto = _profilesCollection
                .Find(filter)
                .Project(projection)
                .FirstOrDefault()?.FirstOrDefault();

            return habitDto?.ToModel();
        }

        public async Task<Habit?> AddHabitAsync(string email, Habit habit)
        {
            var newHabit = new HabitDto
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Name = habit.Name,
                Description = habit.Description,
                IsInProgress = false,
            };
            var updateDefinition = Builders<ProfileDto>.Update.AddToSet<HabitDto>(p => p.Habits, newHabit);
            var result = await _profilesCollection.UpdateOneAsync(p => p.Email == email, updateDefinition);

            Habit? addedHabit = null;
            if (result.IsAcknowledged)
            {
                addedHabit = GetHabit(email, newHabit.Id);
            }

            return addedHabit;
        }

        public async Task<Habit?> UpdateHabitAsync(string email, Habit habit)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email)
                & Builders<ProfileDto>.Filter.ElemMatch(p => p.Habits, h => h.Id == habit.Id);
            var update = Builders<ProfileDto>.Update
                            .Set("habbits.$.name", habit.Name)
                            .Set("habbits.$.description", habit.Description);
            var result = await _profilesCollection.UpdateOneAsync(filter, update);
            Habit? updatedHabit = null;

            if (result.IsAcknowledged)
            {
                updatedHabit = GetHabit(email, habit.Id);
            }

            return updatedHabit;
        }

        public async Task<bool> DeleteHabitAsync(string email, string habitId)
        {
            var updateDefinition = Builders<ProfileDto>.Update.PullFilter(p => p.Habits, h => h.Id == habitId);
            var result = await _profilesCollection.UpdateOneAsync(p => p.Email == email, updateDefinition);

            return result.IsAcknowledged;
        }

        public async Task<bool> GoAboutItAsync(string email, string habitId)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email)
                & Builders<ProfileDto>.Filter.ElemMatch(p => p.Habits, h => h.Id == habitId);
            var update = Builders<ProfileDto>.Update.Set("habbits.$.isInProgress", true);
            var result = await _profilesCollection.UpdateOneAsync(filter, update);

            return result.IsAcknowledged;
        }

        public async Task<bool> StopProgressAsync(string email, string habitId)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email)
                & Builders<ProfileDto>.Filter.ElemMatch(p => p.Habits, h => h.Id == habitId);
            var update = Builders<ProfileDto>.Update.Set("habbits.$.isInProgress", false);
            var result = await _profilesCollection.UpdateOneAsync(filter, update);

            return result.IsAcknowledged;
        }
    }
}
