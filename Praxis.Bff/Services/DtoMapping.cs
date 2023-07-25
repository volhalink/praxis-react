using Praxis.Bff.Models;

namespace Praxis.Bff.Services
{
    public static class DtoMapping
    {
        public static ProfileDto? ToDto(this Profile? profile)
        {
            if (profile == null) return null;
            return new ProfileDto
            {
                Email = profile.Email,
                Name = profile.Name,
                Picture = profile.Picture,
                Locale = profile.Locale,
                Timezone = profile.Timezone,
            };
        }

        public static Profile? ToModel(this ProfileDto? profileDto)
        {
            if (profileDto == null) return null;
            return new Profile
            {
                Email = profileDto.Email,
                Name = profileDto.Name,
                Picture = profileDto.Picture,
                Locale = profileDto.Locale,
                Timezone = profileDto.Timezone,
            };
        }

        public static HabitDto? ToDto(this Habit? habit)
        {
            if (habit == null) return null;
            return new HabitDto
            {
                Id = habit.Id,
                Name = habit.Name,
                Description = habit.Description,
                IsInProgress = habit.IsInProgress,
            };
        }

        public static Habit? ToModel(this HabitDto? habitDto)
        {
            if (habitDto == null) return null;
            return new Habit
            {
                Id = habitDto.Id,
                Name = habitDto.Name,
                Description = habitDto.Description,
                IsInProgress = habitDto.IsInProgress,
            };
        }

        public static HabitHistoryItemDto? ToDto(this HabitHistoryItem? historyItem)
        {
            if (historyItem == null) return null;
            return new HabitHistoryItemDto
            {
                Id = historyItem.Id,
                HabitId = historyItem.HabitId,
                AccomplishmentDate = historyItem.AccomplishmentDate.ToUniversalTime(),
                Comment = historyItem.Comment,
            };
        }

        public static HabitHistoryItem? ToModel(this HabitHistoryItemDto? historyItemDto)
        {
            if (historyItemDto == null) return null;
            return new HabitHistoryItem
            {
                Id = historyItemDto.Id,
                HabitId = historyItemDto.HabitId,
                AccomplishmentDate = historyItemDto.AccomplishmentDate,
                Comment = historyItemDto.Comment,
            };
        }
    }
}
