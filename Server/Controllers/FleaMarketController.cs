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

        [HttpGet]
        [Route("GetMyProducts/{username}&{page}")]
        public List<ProductView> GetMyProducts(string username, int page)
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

        [HttpPatch]
        [Route("GiveMeMoney/{username}&{Cash}")]
        public IActionResult GiveMeMoney(string username, int Cash)
        {
            if (data.GiveMeMoney(username, Cash))
                return Ok();
            else return BadRequest();
        }
    }
}