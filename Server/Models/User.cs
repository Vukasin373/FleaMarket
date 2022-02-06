using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;


namespace Server.Models
{

    public class User
    {
        public ObjectId _id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? City { get; set; }
        public string? Contact { get; set; }
        public int Money { get; set; }
        public List<Notification>? Notifications{ get; set; }
        public List<Product>? Products { get; set; }

    }
}