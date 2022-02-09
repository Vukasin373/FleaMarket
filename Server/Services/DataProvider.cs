using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
                    Money = 0
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
                Tags = product.Tags,
                ImgUrl = product.ImgUrl
            };




            collectionProduct.InsertOne(p);



            collectionProductView.InsertOne(pv);



            user.Products.Add(pv._id);



            var filter = Builders<User>.Filter.Eq("Username", user.Username);
            var update = Builders<User>.Update.Set("Products", user.Products);
            collectionUser.UpdateOne(filter, update);
            return true;



        }



        internal bool CreateBarterNotification(Notification notif, string id)
        {
            var collectionUser = Session.GetCollection<User>("Users");



            var collectionNotification = Session.GetCollection<Notification>("Notifications");



            var seller = collectionUser.Find(x => x._id == ObjectId.Parse(id)).FirstOrDefault();



            var buyer = collectionUser.Find(x => x.Username == notif.Username).FirstOrDefault();



            Console.WriteLine(buyer.Username);



            if (buyer.Money < notif.Price)
                return false;



            Notification notification = new Notification
            {
                FirstName = notif.FirstName,
                LastName = notif.LastName,
                Barter = notif.Barter,
                Price = notif.Price,
                ProductName = notif.ProductName,
                Username = notif.Username,
                ProductId = notif.ProductId
            };



            collectionNotification.InsertOne(notification);



            seller.Notifications.Add(notification._id);



            var filter = Builders<User>.Filter.Eq("_id", seller._id);
            var update = Builders<User>.Update.Set("Notifications", seller.Notifications);
            collectionUser.UpdateOne(filter, update);



            var filter2 = Builders<User>.Filter.Eq("_id", buyer._id);
            var update2 = Builders<User>.Update.Set("Money", buyer.Money - notification.Price);
            collectionUser.UpdateOne(filter2, update2);

            return true; //d
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



        internal List<Notification> GetNotifications(string username)
        {
            var collectionUser = Session.GetCollection<User>("Users");
            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();
            var tmp = user.Notifications;



            var collectionNotification = Session.GetCollection<Notification>("Notifications");
            List<Notification> notifications = new List<Notification>();



            for (int i = notifications.Count - 1; i > notifications.Count - 11; i--)
            {
                if (i < 0)
                    break;
                var notif = collectionNotification.Find<Notification>(x => x._id == user.Notifications[i]).FirstOrDefault<Notification>();
                notifications.Add(notif);
                if (notif.Barter == false)
                {
                    var filter = Builders<Notification>.Filter.Eq("_id", user.Notifications[i]);
                    collectionNotification.DeleteOne(filter);
                    tmp.Remove(user.Notifications[i]);
                }
            }



            var filter2 = Builders<User>.Filter.Eq("Username", username);
            var update = Builders<User>.Update.Set("Notifications", tmp);
            collectionUser.UpdateOne(filter2, update);



            return notifications;
        }



        internal bool BarterAnswer(string id, bool answer, string username)
        {
            var collectionNotification = Session.GetCollection<Notification>("Notifications");
            var notif = collectionNotification.Find<Notification>(x => x._id == ObjectId.Parse(id)).FirstOrDefault<Notification>();
            Console.WriteLine(notif);
            var collectionUser = Session.GetCollection<User>("Users");



            var buyer = collectionUser.Find(x => x.Username == notif.Username).FirstOrDefault();



            var seller = collectionUser.Find(x => x.Username == username).FirstOrDefault();
            var filterSeller = Builders<User>.Filter.Eq("Username", username);
            if (answer)
            {



                var update = Builders<User>.Update.Set("Money", seller.Money + notif.Price);
                collectionUser.UpdateOne(filterSeller, update);



                DeleteProduct(notif.ProductId.ToString());



                Notification n = new Notification
                {
                    Barter = false,
                    FirstName = seller.FirstName,
                    LastName = seller.LastName,
                    Price = notif.Price,
                    ProductName = notif.ProductName,
                    Username = "Accepted"
                };



                CreateNotification(n, buyer._id.ToString());
            }
            else
            {
                Notification n = new Notification
                {
                    Barter = false,
                    FirstName = seller.FirstName,
                    LastName = seller.LastName,
                    Price = notif.Price,
                    ProductName = notif.ProductName,
                    Username = "Declined"
                };



                var filterbuyer = Builders<User>.Filter.Eq("Username", buyer.Username);
                var update = Builders<User>.Update.Set("Money", buyer.Money + notif.Price);
                collectionUser.UpdateOne(filterbuyer, update);



                CreateNotification(n, buyer._id.ToString());
            }



            seller.Notifications.Remove(notif._id);



            var update2 = Builders<User>.Update.Set("Notifications", seller.Notifications);
            collectionUser.UpdateOne(filterSeller, update2);



            collectionNotification.DeleteOne(Builders<Notification>.Filter.Eq("_id", notif._id));
            return true;
        }



        private void CreateNotification(Notification n, string v)
        {
            var collectionUser = Session.GetCollection<User>("Users");



            var collectionNotification = Session.GetCollection<Notification>("Notifications");



            var receiver = collectionUser.Find(x => x._id == ObjectId.Parse(v)).FirstOrDefault();




            collectionNotification.InsertOne(n);



            receiver.Notifications.Add(n._id);



            var filter = Builders<User>.Filter.Eq("_id", receiver._id);
            var update = Builders<User>.Update.Set("Notifications", receiver.Notifications);
            collectionUser.UpdateOne(filter, update);
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



        internal List<String> GetUserDetails(string id)
        {
            ObjectId userId = ObjectId.Parse(id);
            var collectionUser = Session.GetCollection<User>("Users");



            var user = collectionUser.Find(x => x._id == userId).FirstOrDefault();



            List<string> vs = new List<string>();
#pragma warning disable CS8604 // Possible null reference argument.
            vs.Add(user.FirstName);
#pragma warning restore CS8604 // Possible null reference argument.
#pragma warning disable CS8604 // Possible null reference argument.
            vs.Add(user.LastName);
#pragma warning restore CS8604 // Possible null reference argument.
#pragma warning disable CS8604 // Possible null reference argument.
            vs.Add(user.City);
#pragma warning restore CS8604 // Possible null reference argument.
#pragma warning disable CS8604 // Possible null reference argument.
            vs.Add(user.Contact);
#pragma warning restore CS8604 // Possible null reference argument.



            return vs;
        }



        internal Dictionary<string, ProductView> GetSearchResults(string tag, int page, int minPrice, int maxPrice, bool asc)
        {
            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");
            var collectionProduct = Session.GetCollection<Product>("Products");
            Dictionary<string, ProductView> result = new Dictionary<string, ProductView>();
            List<ProductView> list;
            if (asc)
            {
                 list = (from productView in collectionProductView.AsQueryable()
                          where productView.Price >= minPrice &&
                          productView.Price <= maxPrice &&
                          productView.Tags.Contains(tag)
                          orderby productView.Price ascending
                          select productView).Skip<ProductView>((page - 1) * 10).Take<ProductView>(10).ToList<ProductView>();
            }
            else
            {
                list = (from productView in collectionProductView.AsQueryable()
                          where productView.Price >= minPrice &&
                          productView.Price <= maxPrice &&
                          productView.Tags.Contains(tag)
                          orderby productView.Price descending
                          select productView).Skip<ProductView>((page - 1) * 10).Take<ProductView>(10).ToList<ProductView>();
            }

            foreach (ProductView item in list)
            {
                result[item._id.ToString()] = item;
            }
            return result;
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



        public Dictionary<string, ProductView> GetMyProducts(string username, int page)
        {
            var collectionUser = Session.GetCollection<User>("Users");
            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();
            Dictionary<string, ProductView> dict = new Dictionary<string, ProductView>();



            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");

            for (int i = (page - 1) * 10; i < page * 10; i++)
            {
                if (user.Products.Count <= i)
                    break;
                ProductView p = collectionProductView.Find(x => x._id == user.Products[i]).FirstOrDefault();
                dict[p._id.ToString()] = p;
            
            }

            return dict;
        }



        public Product GetProductDetails(string id)
        {
            var collectionView = Session.GetCollection<ProductView>("ProductsView");
            ProductView productView = collectionView.Find(x => x._id == ObjectId.Parse(id)).FirstOrDefault();



            var collection = Session.GetCollection<Product>("Products");
            Product product = collection.Find(x => x._id == productView._id).FirstOrDefault();
            return product;
        }
    }
}