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
        public async Task<IEnumerable<Mock>> Get()
        {
            return await _dataAccess.GetAllMocksAsync();
        }

        [HttpPost]
        public async Task Post([FromBody] Mock mock)
        {
            await _dataAccess.AddMockAsync(mock);
        }

        [HttpPut("{id}")]
        public async Task Put(long id, [FromBody] Mock mock)
        {
            await _dataAccess.UpdateMockAsync(mock);
        }
    }
}
