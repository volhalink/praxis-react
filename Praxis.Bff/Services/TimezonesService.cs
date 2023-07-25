namespace Praxis.Bff.Services
{
    public class TimezonesService : ITimezonesService
    {
        public bool IsSupported(string timezone)
        {
            try
            {
                TimeZoneInfo.FindSystemTimeZoneById(timezone);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
