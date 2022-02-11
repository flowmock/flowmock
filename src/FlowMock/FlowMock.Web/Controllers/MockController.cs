using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlowMock.Web.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class MockController : ControllerBase
    {
        private readonly ILogger<SettingController> _logger;
        private readonly IDataAccess _dataAccess;

        public MockController(ILogger<SettingController> logger, IDataAccess dataAccess)
        {
            _logger = logger;
            _dataAccess = dataAccess;
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
            return await _dataAccess.AddMockAsync(mock);
        }

        [HttpDelete("{id}")]
        public async Task Delete(long id)
        {
            await _dataAccess.DeleteMockAsync(id);
        }

        [HttpPut("{id}")]
        public async Task Put(long id, [FromBody] Mock mock)
        {
            await _dataAccess.UpdateMockAsync(mock);
        }
    }
}
