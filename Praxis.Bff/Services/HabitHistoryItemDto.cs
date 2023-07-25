using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Praxis.Bff.Services
{
    public class HabitHistoryItemDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("habitid")]
        public string HabitId { get; set; }

        [BsonRepresentation(BsonType.DateTime)]
        [BsonElement("accomplishmentdate")]
        public DateTime AccomplishmentDate { get; set; }

        [BsonElement("comment")]
        public string Comment { get; set; }
    }
}
