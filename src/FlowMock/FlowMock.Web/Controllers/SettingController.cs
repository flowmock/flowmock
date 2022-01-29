using FlowMock.Engine.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlowMock.Web.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SettingController : ControllerBase
    {
        private readonly ILogger<SettingController> _logger;

        public SettingController(ILogger<SettingController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Setting> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Setting
            {
                Key = $"Key{index}",
                Value = $"Value{index}"
            })
            .ToArray();
        }
    }
}
