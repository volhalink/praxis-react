using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Praxis.Bff.Services
{
    public class HabitDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }
}
