using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
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

            var u = collection.Find(x => x.Username == user.Username).FirstOrDefault();

            if (u == null)
            {
                User r = new User
                {
                    Username = user.Username,
                    Password = user.Password,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    City = user.City,
                    Contact = user.Contact,
                    Money = user.Money,

                };

                collection.InsertOne(r);
                return true;
            }
            return false;
        }

        public bool LogIn(string username, string password)
        {
            var collection = Session.GetCollection<User>("Users");

            var u = collection.Find(x => x.Username == username && x.Password == password).FirstOrDefault();

            if (u == null)
            {
                return false;
            }
            return true;
        }

        public bool CreateProduct(Product product, string username)
        {
            var collectionProduct = Session.GetCollection<Product>("Products");
            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");
            var collectionUser = Session.GetCollection<User>("Users");


            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();

            Product p = new Product
            {
                ImgUrl = product.ImgUrl,
                Description = product.Description,
                Price = product.Price,
                Name = product.Name,
                Tags = product.Tags,
                CustomAttributes = product.CustomAttributes

            };


            collectionProduct.InsertOne(p);
            

            ProductView pv = new ProductView
            {
                Name = product.Name,
                Price = product.Price,
                Product = p._id,
                User = user._id
            };

            collectionProductView.InsertOne(pv);

            user.Products.Add( pv._id);

            var filter = Builders<User>.Filter.Eq("Username", user.Username);
            var update = Builders<User>.Update.Set("Products", user.Products);
            collectionUser.UpdateOne(filter,update);
            return true;

        }

        public List<ProductView> GetMyProducts(string username, int page)
        {
            var collectionUser = Session.GetCollection<User>("Users");
            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();
            List<ProductView> products = new List<ProductView>();

            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");
            
            for (int i= (page-1)*10; i < page*10; i++) 
            {
                if (user.Products.Count <= i)
                    break;
                products.Add(collectionProductView.Find(x => x._id == user.Products[i]).FirstOrDefault());
            }

            return products;

        }

        public Product GetProductDetails(ObjectId id)
        {
            var collection = Session.GetCollection<Product>("Products");
            var product = collection.Find(x => x._id == id).FirstOrDefault();

           

            Product p = new Product
            {
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                ImgUrl = product.ImgUrl,
                CustomAttributes = product.CustomAttributes,
                Tags = product.Tags,
                _id = product._id
            };

            return p;
        }
    }
}


