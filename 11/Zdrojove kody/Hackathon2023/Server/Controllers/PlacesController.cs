using Microsoft.AspNetCore.Mvc;
using Server.Services;
using System.Text.Json.Serialization;
using Newtonsoft;
using Newtonsoft.Json;
using Server.FrontendModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        // GET: api/<PlacesController>
        [HttpGet]
        public string Get()
        {
            List<FrontendPlace> places = AppServer.Instance.GetPlaces();
            string a = JsonConvert.SerializeObject(places);
            return a;
        }

        // GET api/<PlacesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PlacesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PlacesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PlacesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
