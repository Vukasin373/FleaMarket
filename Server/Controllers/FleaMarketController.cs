using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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


        //[HttpPost]
        //[Route("LogIn")]
        //public async Task<bool> LogIn([FromBody] User user)
        //{
        //    //return await data.LogInAsync(user);
        //}

        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] User user)
        {
            return Ok( data.Register(user));
        }


        [HttpGet]
        [Route("GetProducts")]
        public async Task<List<Product>> GetProducts()
        {
            var p =  data.Session.GetCollection<Product>("Product");
            var radnici= p.Find<Product>(FilterDefinition<Product>.Empty);
            foreach (Product r in radnici.ToList<Product>())
            {
                System.Console.WriteLine(r.Name);
            }
            return await radnici.ToListAsync<Product>();


        }


    }
}