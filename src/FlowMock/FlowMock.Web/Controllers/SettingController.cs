using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using LazyCache;
using Microsoft.AspNetCore.Mvc;

namespace FlowMock.Web.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SettingController : ControllerBase
    {
        private readonly ILogger<SettingController> _logger;
        private readonly IDataAccess _dataAccess;
        private readonly IAppCache _appCache;

        public SettingController(ILogger<SettingController> logger, IDataAccess dataAccess, IAppCache appCache)
        {
            _logger = logger;
            _dataAccess = dataAccess;
            _appCache = appCache;
        }

        [HttpGet]
        public async Task<IEnumerable<Setting>> Get()
        {
            return await _dataAccess.GetAllSettingsAsync();            
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] IEnumerable<Setting> settings)
        {
            await _dataAccess.SaveSettingsAsync(settings);
            _appCache.Remove("settings");

            return Ok();
        }
    }
}
