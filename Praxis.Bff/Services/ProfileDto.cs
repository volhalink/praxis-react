﻿using MongoDB.Bson.Serialization.Attributes;
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
        [BsonElement("habbits")]
        public IList<HabitDto>? Habits { get; set; }
    }
}