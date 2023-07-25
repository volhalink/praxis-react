using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Praxis.Bff.Services
{
    public class ProfileDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("picture")]
        public string? Picture { get; set; }

        [BsonElement("locale")]
        public string Locale { get; set; }

        [BsonElement("timezone")]
        public string Timezone { get; set; }

        [BsonElement("habits")]
        public IList<HabitDto>? Habits { get; set; }
        [BsonElement("history")]
        public IList<HabitHistoryItemDto> History { get; set; } = new List<HabitHistoryItemDto>();
    }
}
