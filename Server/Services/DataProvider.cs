using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Server.Models;

namespace Server.Services
{

    public class DataProvider
    {
        public IMongoDatabase Session { get; set; }
        public DataProvider()
        {
            Session = new MongoSession().Session;
        }


        public bool Register(User user)
        {
            var collection = Session.GetCollection<User>("Users");
            var query = Query.EQ("Username", user.Username);
            var u = collection.Find<User>((FilterDefinition<User>)query);
            System.Console.WriteLine(u);
            if (u == null)
            {
                return true;
            }
            return false;
        }
    }
}
