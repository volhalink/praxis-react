namespace Praxis.Bff.Services
{
    public class PraxisDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string ProfilesCollectionName { get; set; } = null!;
    }
}
