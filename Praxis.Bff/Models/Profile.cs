namespace Praxis.Bff.Models
{
    public class Profile
    {
        public bool IsLoggedIn { get; set; } = false;

        public string Name { get; set; }

        public string Email { get; set; }

        public string? Picture { get; set; }

        public string Locale { get; set; }

        public string Timezone { get; set; }

    }
}
