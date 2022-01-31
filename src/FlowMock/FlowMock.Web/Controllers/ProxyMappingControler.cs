using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using LazyCache;
using Microsoft.AspNetCore.Mvc;

namespace FlowMock.Web.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProxyMappingController : ControllerBase
    {
        private readonly ILogger<SettingController> _logger;
        private readonly IDataAccess _dataAccess;
        private readonly IAppCache _appCache;

        public ProxyMappingController(ILogger<SettingController> logger, IDataAccess dataAccess, IAppCache appCache)
        {
            _logger = logger;
            _dataAccess = dataAccess;
            _appCache = appCache;
        }

        [HttpGet]
        public async Task<IEnumerable<ProxyMapping>> Get()
        {
            return await _dataAccess.GetAllProxyMappingsAsync();            
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] IEnumerable<ProxyMapping> proxyMappings)
        {
            await _dataAccess.SaveProxyMappingsAsync(proxyMappings);
            _appCache.Remove("proxyMappings");

            return Ok();
        }
    }
}
