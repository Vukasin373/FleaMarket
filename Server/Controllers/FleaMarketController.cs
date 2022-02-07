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
            if (data.LogIn(username,password))
                return Ok();
            return BadRequest();
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] User user)
        {
            if (data.Register(user))
                return Ok();
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

        [HttpPost]
        [Route("GetProductDetails")]
        public Product GetProductDetails([FromBody]ObjectId id)
        {
            return data.GetProductDetails(id);

        }








        //[HttpGet]
        //[Route("GetProducts")]
        //public async Task<List<Product>> GetProducts()
        //{
        //    var p =  data.Session.GetCollection<Product>("Product");
        //    List<ObjectId>
        //    var radnici= p.Find<Product>(FilterDefinition<Product>.Empty);
        //    foreach (Product r in radnici.ToList<Product>())
        //    {
        //        System.Console.WriteLine(r.Name);
        //    }
        //    return await radnici.ToListAsync<Product>();


        //}




    }
}