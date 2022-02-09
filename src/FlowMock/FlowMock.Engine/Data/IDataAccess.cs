using FlowMock.Engine.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlowMock.Engine.Data
{
    public interface IDataAccess
    {        
        Task<IEnumerable<Setting>> GetAllSettingsAsync();
        Task SaveSettingsAsync(IEnumerable<Setting> settings);
        Task<Setting> GetSettingsByKeyAsync(string key);
        Task<IEnumerable<Request>> GetAllRequestsAsync();
        
        Task AddRequestAsync(Request request);
        Task<IEnumerable<ProxyMapping>> GetAllProxyMappingsAsync();
        Task SaveProxyMappingsAsync(IEnumerable<ProxyMapping> proxyMappings);

        Task<IEnumerable<Mock>> GetAllMocksAsync();
        Task AddMockAsync(Mock mock);
        Task UpdateMockAsync(Mock mock);
        Task DeleteMockAsync(long id);
    }
}
