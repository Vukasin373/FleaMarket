using MongoDB.Bson;

namespace Server.Models
{
    public class Notification
    {
        public ObjectId? _id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ProductName { get; set; }
        public int Price { get; set; }
        public bool Barter { get; set; }

        public Notification()
        {
            _id = ObjectId.GenerateNewId();
        }

    }
}