using Microsoft.AspNetCore.Mvc;

namespace portfolio.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HelloWorldController : ControllerBase
    {

        private readonly ILogger<HelloWorldController> _logger;

        public HelloWorldController(ILogger<HelloWorldController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "HelloWorld")]
        public string Get()
        {
            return "Hello World! (At server " + DateTime.Now.ToString() + ")";
        }
    }
}
