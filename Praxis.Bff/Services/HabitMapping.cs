using Praxis.Bff.Models;

namespace Praxis.Bff.Services
{
    public static class HabitMapping
    {
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
    }
}
