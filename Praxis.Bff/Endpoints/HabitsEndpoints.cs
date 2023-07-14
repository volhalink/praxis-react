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

            app.MapPost("/api/habits/goaboutit", async (string habitId, ClaimsPrincipal user, IHabitsService habitsService) =>{
                string? email = user?.GetEmail();
                var result = false;
                if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(habitId))
                {
                    result = await habitsService.GoAboutItAsync(email, habitId);
                }

                return result;
            });

            app.MapPost("/api/habits/stopprogress", async (string habitId, ClaimsPrincipal user, IHabitsService habitsService) => {
                string? email = user?.GetEmail();
                var result = false;
                if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(habitId))
                {
                    result = await habitsService.StopProgressAsync(email, habitId);
                }

                return result;
            });
        }
    }
}
