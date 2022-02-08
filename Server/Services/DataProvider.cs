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


        public User? Register(User user)
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
                return r;
            }
            return null;
        }

        public User LogIn(string username, string password)
        {
            var collection = Session.GetCollection<User>("Users");

            var u = collection.Find(x => x.Username == username && x.Password == password).FirstOrDefault();

            return u;
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

            ProductView pv = new ProductView
            {
                Name = product.Name,
                Price = product.Price,
                User = user._id,
                _id = p._id
            };


            collectionProduct.InsertOne(p);
            

            collectionProductView.InsertOne(pv);

            user.Products.Add( pv._id);

            var filter = Builders<User>.Filter.Eq("Username", user.Username);
            var update = Builders<User>.Update.Set("Products", user.Products);
            collectionUser.UpdateOne(filter,update);
            return true;

        }

        internal bool ChangeCity(string username, string city)
        {
            var collectionUser = Session.GetCollection<User>("Users");

            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();

            var filter = Builders<User>.Filter.Eq("Username", username);
            var update = Builders<User>.Update.Set("City", city);
            collectionUser.UpdateOne(filter, update);

            return true;
        }

        internal bool GiveMeMoney(string username, int cash)
        {
            var collectionUser = Session.GetCollection<User>("Users");

            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();

            var filter = Builders<User>.Filter.Eq("Username", username);
            var update = Builders<User>.Update.Set("Money", user.Money + cash);
            collectionUser.UpdateOne(filter, update);

            return true;
        }

        internal List<ProductView> GetSearchResults(string tag, int page, int minPrice, int maxPrice, bool asc)
        {
            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");
            var collectionProduct = Session.GetCollection<Product>("Products");

            var result = (from product in collectionProduct.AsQueryable()
                          where product.Price > minPrice &&
                          product.Price < maxPrice && 
                          product.Tags.Contains(tag)
                          orderby product.Price descending select product);

            MessageBox.Show("Prvi radnik po opadajucem redosledu po prezimenu koji ima platu vecu od 20000: " + result2.ime + " " + result2);
        }

        internal bool ChangeContact(string username, string contact)
        {
            var collectionUser = Session.GetCollection<User>("Users");

            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();

            var filter = Builders<User>.Filter.Eq("Username", username);
            var update = Builders<User>.Update.Set("Contact", contact);
            collectionUser.UpdateOne(filter, update);

            return true;
        }

        internal bool ChangePassword(string username, string oldPassword, string newPassword)
        {
            var collectionUser = Session.GetCollection<User>("Users");

            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();

            if (user.Password != oldPassword)
                return false;

            var filter = Builders<User>.Filter.Eq("Username", username);
            var update = Builders<User>.Update.Set("Password", newPassword);
            collectionUser.UpdateOne(filter, update);

            return true;
        }

        internal void UpdateProduct(Product product)
        {
            var collectionProduct = Session.GetCollection<Product>("Products");
            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");

            ProductView pView = collectionProductView.Find<ProductView>(x => x._id == product._id).FirstOrDefault<ProductView>();
            Product p = collectionProduct.Find<Product>(x => x._id == product._id).FirstOrDefault<Product>();

            p.Price = product.Price;
            p.Name = product.Name;
            p.ImgUrl = product.ImgUrl;
            p.Description = product.Description;
            p.Tags = product.Tags;
            p.CustomAttributes = product.CustomAttributes;

            var filter = Builders<Product>.Filter.Eq("_Id", product._id);

            collectionProduct.ReplaceOne(filter, p);

            pView.Price = product.Price;
            pView.Name = product.Name;

            var filter2 = Builders<ProductView>.Filter.Eq("_Id", product._id);

            collectionProductView.ReplaceOne(filter2, pView);
        }

        internal void DeleteProduct(string id)
        {
            var collectionProduct = Session.GetCollection<Product>("Products");
            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");
            var collectionUser = Session.GetCollection<User>("Users");


            ObjectId objectId = ObjectId.Parse(id);

            ProductView p = collectionProductView.Find<ProductView>(x => x._id == objectId).FirstOrDefault<ProductView>();

            User u = collectionUser.Find<User>(x => x._id == p.User).FirstOrDefault<User>();

            u.Products.Remove(objectId);

            var filter = Builders<User>.Filter.Eq("Username", u.Username);
            var update = Builders<User>.Update.Set("Products", u.Products);
            collectionUser.UpdateOne(filter, update);

            collectionProduct.DeleteOne<Product>(x => x._id == objectId);
            collectionProductView.DeleteOne<ProductView>(x => x._id == objectId);
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

        public Product GetProductDetails(string id)
        {
            var collection = Session.GetCollection<Product>("Products");
            Product product = collection.Find(x => x._id == ObjectId.Parse(id)).FirstOrDefault();


            return product;
        }
    }
}


