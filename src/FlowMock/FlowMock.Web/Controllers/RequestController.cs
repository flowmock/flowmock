using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlowMock.Web.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class RequestController : ControllerBase
    {
        private readonly ILogger<SettingController> _logger;
        private readonly IDataAccess _dataAccess;

        public RequestController(ILogger<SettingController> logger, IDataAccess dataAccess)
        {
            _logger = logger;
            _dataAccess = dataAccess;
        }

        [HttpGet]
        public async Task<IEnumerable<Request>> Get()
        {
            return await _dataAccess.GetAllRequestsAsync();
        }
    }
}
