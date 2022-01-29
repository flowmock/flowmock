using FlowMock.Engine.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlowMock.Engine.Data
{
    public interface IDataAccess
    {
        Task<IEnumerable<Setting>> GetAllSettingsAsync();
        Task<Setting> GetSettingsByKeyAsync(string key);
        Task<IEnumerable<Request>> GetAllRequestsAsync();
        Task AddRequestAsync(Request request);
    }
}
