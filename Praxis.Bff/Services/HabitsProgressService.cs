using MongoDB.Bson;
using MongoDB.Driver;
using Praxis.Bff.Models;

namespace Praxis.Bff.Services
{
    public class HabitsProgressService : IHabitsProgressService
    {
        private readonly IMongoCollection<ProfileDto> _profilesCollection;

        public HabitsProgressService(IMongoCollection<ProfileDto> profilesCollection)
        {
            _profilesCollection = profilesCollection;
        }

        public async Task<bool> GoAboutItAsync(string email, string habitId)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email)
                & Builders<ProfileDto>.Filter.ElemMatch(p => p.Habits, h => h.Id == habitId);
            var update = Builders<ProfileDto>.Update.Set("habits.$.isInProgress", true);
            var result = await _profilesCollection.UpdateOneAsync(filter, update);

            return result.IsAcknowledged;
        }

        public async Task<bool> StopProgressAsync(string email, string habitId)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email)
                & Builders<ProfileDto>.Filter.ElemMatch(p => p.Habits, h => h.Id == habitId);
            var update = Builders<ProfileDto>.Update.Set("habits.$.isInProgress", false);
            var result = await _profilesCollection.UpdateOneAsync(filter, update);

            return result.IsAcknowledged;
        }

        public HabitHistoryItem? GetAccomplishment(string email, string id)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email)
                    & Builders<ProfileDto>.Filter.ElemMatch(p => p.History, h => h.Id == id);
            var projection = Builders<ProfileDto>.Projection.Expression(p => p.History.Where(h => h.Id == id));

            var historyItemDto = _profilesCollection
                .Find(filter)
                .Project(projection)
                .FirstOrDefault()?.FirstOrDefault();

            return historyItemDto?.ToModel();
        }

        public async Task<HabitHistoryItem?> AccomplishOnDateAsync(string email, HabitHistoryItem newHabitHistoryItem)
        {
            var dto = newHabitHistoryItem.ToDto();
            if (dto == null) return null;

            dto.Id = string.IsNullOrEmpty(dto.Id) ? ObjectId.GenerateNewId().ToString() : dto.Id;
            var updateFilter = Builders<ProfileDto>.Filter.Eq("email", email)
                    & Builders<ProfileDto>.Filter.ElemMatch(p => p.History, h => h.Id == dto.Id && h.HabitId == dto.HabitId);
            var update = Builders<ProfileDto>.Update
                .Set("history.$.comment", dto.Comment);
            var result = await _profilesCollection.UpdateOneAsync(updateFilter, update);
            var updated = result.IsAcknowledged && result.ModifiedCount > 0;

            if (!updated)
            {
                var insertFilter = Builders<ProfileDto>.Filter.Eq("email", email)
                    & Builders<ProfileDto>.Filter.ElemMatch(p => p.Habits, h => h.Id == dto.HabitId);
                var insert = Builders<ProfileDto>.Update.AddToSet(p => p.History, dto);

                result = await _profilesCollection.UpdateOneAsync(insertFilter, insert);
            }

            HabitHistoryItem? updatedDto = null;
            if (result.IsAcknowledged)
            {
                updatedDto = GetAccomplishment(email, dto.Id);
            }

            return updatedDto;
        }

        public async Task<bool> DeleteAccomplishmentAsync(string email, string id)
        {
            if (string.IsNullOrEmpty(id)) return false;
            
            var updateFilter = Builders<ProfileDto>.Filter.Eq("email", email);
            var update = Builders<ProfileDto>.Update.PullFilter("history", Builders<HabitHistoryItemDto>.Filter.Eq(hi => hi.Id, id));

            var result = await _profilesCollection.UpdateOneAsync(updateFilter, update);

            return result.IsAcknowledged;
        }

        public IList<DateTime> GetHabitAccomplishmentDates(string email, string habitId)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email)
                & Builders<ProfileDto>.Filter.ElemMatch(p => p.History, h => h.HabitId == habitId);
            var projection = Builders<ProfileDto>.Projection.Expression(p => p.History.Where(h => h.HabitId == habitId));

            var result = _profilesCollection.Find(filter).Project(projection).FirstOrDefault()?.Select(hi => hi.AccomplishmentDate).OrderByDescending(d => d.Ticks).ToList();

            return result ?? new List<DateTime>(0);
        }

        public IList<HabitHistoryItem> GetHistory(string email)
        {
            var filter = Builders<ProfileDto>.Filter.Eq("email", email);
            var projection = Builders<ProfileDto>.Projection.Expression(p => p.History);

            var result = _profilesCollection.Find(filter).Project(projection).FirstOrDefault()?.Select(hi => hi.ToModel()).OrderByDescending(hi => hi.AccomplishmentDate.Ticks).ToList();

            return result ?? new List<HabitHistoryItem>(0);
        }
    }
}
