using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Server.Services
{

    public class MongoSession
    {
        private IMongoDatabase? session;
        public IMongoDatabase Session
        {
            get
            {
                if (session == null)
                {
                    var settings = MongoClientSettings.FromConnectionString("mongodb+srv://admin:admin@fleamarket.z2vvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
                    var client = new MongoClient(settings);
                    session = client.GetDatabase("FleaMarket");
                }

                return session;
            }
        }
    }
}
