using Praxis.Bff.Models;
using Praxis.Bff.Services;
using System.Security.Claims;

namespace Praxis.Bff.Endpoints
{
    public static class HabitsEndpoints
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/api/habits/all", (ClaimsPrincipal user, IHabitsService habitsService) =>
            {
                string? email = user?.GetEmail();
                return !string.IsNullOrEmpty(email) ? habitsService.GetHabits(email) : new List<Habit>();
            });

            app.MapGet("/api/habits", (string habitId, ClaimsPrincipal user, IHabitsService habitsService) =>
            {
                string? email = user?.GetEmail();
                return !string.IsNullOrEmpty(email) && ! string.IsNullOrEmpty(habitId)? habitsService.GetHabit(email, habitId) : null;
            });

            app.MapPost("/api/habits/", async (Habit habit, ClaimsPrincipal user, IHabitsService habitsService) =>
            {
                string? email = user?.GetEmail();
                Habit? result = null;

                if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(habit.Name))
                {
                    result = await habitsService.AddHabitAsync(email, habit);
                }

                return result;
            });

            app.MapPut("/api/habits/", async (Habit habit, ClaimsPrincipal user, IHabitsService habitsService) =>
            {
                string? email = user?.GetEmail();
                Habit? result = null;

                if (!string.IsNullOrWhiteSpace(email) 
                        && !string.IsNullOrWhiteSpace(habit.Id)
                        && !string.IsNullOrEmpty(habit.Name))
                {
                    result = await habitsService.UpdateHabitAsync(email, habit);
                }

                return result;
            });

            app.MapDelete("/api/habits/", async (string habitId, ClaimsPrincipal user, IHabitsService habitsService) =>
            {
                string? email = user?.GetEmail();
                var result = false;
                if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(habitId))
                {
                    result = await habitsService.DeleteHabitAsync(email, habitId);
                }

                return result;
            });
        }
    }
}
