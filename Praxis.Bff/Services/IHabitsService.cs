using Praxis.Bff.Models;

namespace Praxis.Bff.Services
{
    public interface IHabitsService
    {
        IList<Habit> GetHabits(string email);

        Habit? GetHabit(string email, string habitId);

        Task<Habit?> AddHabitAsync(string email, Habit habbit);

        Task<Habit?> UpdateHabitAsync(string email, Habit habit);

        Task<bool> DeleteHabitAsync(string email, string habitId);

        Task<bool> GoAboutItAsync(string email, string habitId);

        Task<bool> StopProgressAsync(string email, string habitId);
    }
}
