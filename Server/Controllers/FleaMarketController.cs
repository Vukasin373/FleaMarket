using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class FleaMarketController : ControllerBase
    {
        public DataProvider data { get; set; }

        public FleaMarketController()
        {
            data = new DataProvider();
        }


        [HttpGet]
        [Route("LogIn/{username}&{password}")]
        public IActionResult LogIn(string username, string password)
        {
            var a = data.LogIn(username, password);
            if (a != null)
                return Ok(a);
            return BadRequest();
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] User user)
        {
            Console.WriteLine(user.ToJson());
            var a = data.Register(user);
            if (a != null)
                return Ok(a);
            return BadRequest();
        }

        [HttpPost]
        [Route("CreateProduct/{username}")]
        public IActionResult CreateProductAsync([FromBody] Product product,string username)
        {
            if (data.CreateProduct(product, username))
                return Ok();
            return BadRequest();
        }

        [HttpPost]
        [Route("CreateNotification/{id}")]
        public IActionResult CreateNotification([FromBody] Notification notif, string id)
        {
            if (data.CreateBarterNotification(notif, id))
                return Ok();
            return BadRequest();
        }

        [HttpGet]
        [Route("GetMyProducts/{username}&{page}")]
        public Dictionary<string, ProductView> GetMyProducts(string username, int page)
        {
            return data.GetMyProducts(username, page);

        }

        [HttpGet]
        [Route("GetProductDetails/{id}")]
        public Product GetProductDetails(string id)
        {
            return data.GetProductDetails(id);

        }

        [HttpPut]
        [Route("UpdateProduct/")]
        public void UpdateProduct([FromBody]Product product)
        {
            data.UpdateProduct(product);
        }

        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public void DeleteProduct(string id)
        {
            data.DeleteProduct(id);
        }

        [HttpPut]
        [Route("ChangePassword/{username}&{oldPassword}&{newPassword}")]
        public IActionResult ChangePassword(string username, string oldPassword, string newPassword)
        {
            if (data.ChangePassword(username, oldPassword, newPassword))
                return Ok();
            else return BadRequest();
        }

        [HttpPatch]
        [Route("ChangeCity/{username}&{City}")]
        public IActionResult ChangeCity(string username, string City)
        {
            if (data.ChangeCity(username, City))
                return Ok();
            else return BadRequest();
        }

        [HttpPatch]
        [Route("ChangeContact/{username}&{Contact}")]
        public IActionResult ChangeContact(string username, string Contact)
        {
            if (data.ChangeContact(username, Contact))
                return Ok();
            else return BadRequest();
        }

        [HttpPut]
        [Route("GiveMeMoney/{username}&{Cash}")]
        public IActionResult GiveMeMoney(string username, int Cash)
        {
            if (data.GiveMeMoney(username, Cash))
                return Ok();
            else return BadRequest();
        }

        [HttpGet]
        [Route("GetSearchResults/{tag}&{page}&{minPrice}&{maxPrice}&{asc}")]
        public Dictionary<string, ProductView> GetSearchResults(string tag, int page, int minPrice, int maxPrice, bool asc)
        {
            return data.GetSearchResults(tag, page, minPrice, maxPrice, asc);

        }

        [HttpGet]
        [Route("GetUserDetails/{id}")]
        public List<String> GetUserDetails(string id)
        {
            return data.GetUserDetails(id);

        }

        [HttpGet]
        [Route("GetNotifications/{username}")]
        public List<Notification> GetNotifications(string username)
        {
            return data.GetNotifications(username);

        }

        [HttpPut]
        [Route("BarterAnswer/{id}&{answer}&{ownerUsername}")]
        public IActionResult BarterAnswer(string id, bool answer, string ownerUsername)
        {
            return Ok(data.BarterAnswer(id, answer, ownerUsername));

        }
    }
}