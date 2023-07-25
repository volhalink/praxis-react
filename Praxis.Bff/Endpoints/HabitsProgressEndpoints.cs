using Praxis.Bff.Models;
using Praxis.Bff.Services;
using System.Security.Claims;

namespace Praxis.Bff.Endpoints
{
    public static class HabitsProgressEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapPost("/api/habits/goaboutit", async (string habitId, ClaimsPrincipal user, IHabitsProgressService habitsProgressService) => {
                string? email = user?.GetEmail();
                var result = false;
                if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(habitId))
                {
                    result = await habitsProgressService.GoAboutItAsync(email, habitId);
                }

                return result;
            });

            app.MapPost("/api/habits/stopprogress", async (string habitId, ClaimsPrincipal user, IHabitsProgressService habitsProgressService) => {
                string? email = user?.GetEmail();
                var result = false;
                if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(habitId))
                {
                    result = await habitsProgressService.StopProgressAsync(email, habitId);
                }

                return result;
            });

            var isTodayOrYesterday = (DateTime d) =>
            {
                var now = DateTime.UtcNow;
                var date = d.ToUniversalTime();
                
                var result = (now.Year == date.Year && now.Month == date.Month && (now.Day == date.Day || now.Day == date.Day + 1))
                            || (now.Year == date.Year && now.Month == date.Month + 1 && now.Day == 1 && date.Day == DateTime.DaysInMonth(date.Year, date.Month))
                            || (now.Year == date.Year + 1 && now.Month == 1 && date.Month == 12 && now.Day == 1 && date.Day == DateTime.DaysInMonth(date.Year, date.Month));
                
                return result;
            };

            var isValidHistoryItem = (HabitHistoryItem historyItem) =>
            {
                return !string.IsNullOrWhiteSpace(historyItem.HabitId)
                && isTodayOrYesterday(historyItem.AccomplishmentDate);
            };

            app.MapPost("/api/habits/accomplish", async (HabitHistoryItem historyItem, ClaimsPrincipal user, IHabitsProgressService habitsProgressService) =>
            {      
                string? email = user?.GetEmail();
                HabitHistoryItem result = null;
                if (!string.IsNullOrWhiteSpace(email) 
                && isValidHistoryItem(historyItem))
                {
                    result = await habitsProgressService.AccomplishOnDateAsync(email, historyItem);
                }

                return result;
            });

            app.MapDelete("/api/habits/accomplish", async (string id, ClaimsPrincipal user, IHabitsProgressService habitsProgressService) =>
            {
                string? email = user?.GetEmail();
                var result = false;
                if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrEmpty(id))
                {
                    result = await habitsProgressService.DeleteAccomplishmentAsync(email, id);
                }

                return result? id : null;
            });

            app.MapGet("/api/habits/history", (ClaimsPrincipal user, IHabitsProgressService habitsProgressService) =>
            {
                string? email = user?.GetEmail();
                IList<HabitHistoryItem> result = new List<HabitHistoryItem>(0);
                if (!string.IsNullOrWhiteSpace(email))
                {
                    result = habitsProgressService.GetHistory(email);
                }

                return result;
            });

        }
    }
}
