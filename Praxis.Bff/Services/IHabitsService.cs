using Praxis.Bff.Models;

namespace Praxis.Bff.Services
{
    public interface IHabitsService
    {
        IList<Habit> GetHabits(string email);
        Task<Habit?> AddHabitAsync(string email, Habit habbit);

        Task<bool> DeleteHabitAsync(string email, string habitId);

        Task<bool> GoAboutItAsync(string email, string habitId);

        Task<bool> StopProgressAsync(string email, string habitId);
    }
}
