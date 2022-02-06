using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Server.Services
{

    public class MongoSession
    {

        var settings = MongoClientSettings.FromConnectionString("mongodb+srv://admin:admin@fleamarket.z2vvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        var client = new MongoClient(settings);
        var database = client.GetDatabase("FleaMarket");

    }
}
