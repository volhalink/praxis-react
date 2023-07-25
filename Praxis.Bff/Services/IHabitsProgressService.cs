using Praxis.Bff.Models;

namespace Praxis.Bff.Services
{
    public interface IHabitsProgressService
    {
        Task<bool> GoAboutItAsync(string email, string habitId);

        Task<bool> StopProgressAsync(string email, string habitId);

        HabitHistoryItem? GetAccomplishment(string email, string id);

        Task<HabitHistoryItem?> AccomplishOnDateAsync(string email, HabitHistoryItem newHabitHistoryItem);

        Task<bool> DeleteAccomplishmentAsync(string email, string id);

        IList<DateTime> GetHabitAccomplishmentDates(string email, string habitId);

        IList<HabitHistoryItem> GetHistory(string email);
    }
}
