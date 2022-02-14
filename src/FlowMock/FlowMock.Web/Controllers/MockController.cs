using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using LazyCache;
using Microsoft.AspNetCore.Mvc;

namespace FlowMock.Web.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class MockController : ControllerBase
    {
        private readonly ILogger<SettingController> _logger;
        private readonly IDataAccess _dataAccess;
        private readonly IAppCache _appCache;

        public MockController(ILogger<SettingController> logger, IDataAccess dataAccess, IAppCache appCache)
        {
            _logger = logger;
            _dataAccess = dataAccess;
            _appCache = appCache;
        }

        [HttpGet]
        public async Task<IEnumerable<Mock>> GetAll([FromQuery] FilterAndProjectionQuery filterAndProjectionQuery)
        {
            return await _dataAccess.GetAllMocksAsync(filterAndProjectionQuery);
        }

        [HttpGet("{id}")]
        public async Task<Mock> GetOne(long id)
        {
            return await _dataAccess.GetMockByIdAsync(id);
        }

        [HttpPost]
        public async Task<Mock> Post([FromBody] Mock mock)
        {
            _appCache.Remove("mocks");
            return await _dataAccess.AddMockAsync(mock);
        }

        [HttpDelete("{id}")]
        public async Task Delete(long id)
        {
            _appCache.Remove("mocks");
            await _dataAccess.DeleteMockAsync(id);
        }

        [HttpPut("{id}")]
        public async Task Put(long id, [FromBody] Mock mock)
        {
            _appCache.Remove("mocks");
            await _dataAccess.UpdateMockAsync(mock);
        }
    }
}
