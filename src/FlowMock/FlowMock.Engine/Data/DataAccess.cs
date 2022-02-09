using Dapper;
using FlowMock.Engine.Models;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlowMock.Engine.Data
{
    public class DataAccess : IDataAccess
    {
        private const string ConnectionString = "Data Source=FlowMock.sqlite";

        public async Task AddRequestAsync(Request request)
        {
            using var connection = new SqliteConnection(ConnectionString);

            await connection.ExecuteAsync(@"INSERT INTO requests (timestamp, url, request_method, request_headers, request_body, response_status, response_headers, response_body, mock_id)
                VALUES (@Timestamp, @Url, @RequestMethod, @RequestHeaders, @RequestBody, @ResponseStatus, @ResponseHeaders, @ResponseBody, @MockId);", request);
        }

        public async Task<IEnumerable<ProxyMapping>> GetAllProxyMappingsAsync()
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryAsync<ProxyMapping>("SELECT base_path, proxy_to_base_url FROM proxy_mappings;");
        }

        public async Task<IEnumerable<Request>> GetAllRequestsAsync()
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryAsync<Request>("SELECT id, timestamp, url, request_method, request_headers, request_body, response_status, response_headers, response_body, mock_id FROM requests;");
        }

        public async Task<IEnumerable<Setting>> GetAllSettingsAsync()
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryAsync<Setting>("SELECT key, value, description FROM settings;");
        }

        public async Task<Setting> GetSettingsByKeyAsync(string key)
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryFirstAsync<Setting>("SELECT key, value FROM settings WHERE key=@key;", key);
        }

        public async Task SaveProxyMappingsAsync(IEnumerable<ProxyMapping> proxyMappings)
        {
            using var connection = new SqliteConnection(ConnectionString);

            try
            {
                var existingProxies = (await GetAllProxyMappingsAsync()).ToList();

                foreach (ProxyMapping proxyMapping in proxyMappings)
                {
                    if (existingProxies.Any(existingProxy => existingProxy.BasePath == proxyMapping.BasePath))
                    {
                        await connection.ExecuteAsync(@"UPDATE proxy_mappings SET proxy_to_base_url=@ProxyToBaseUrl WHERE base_path=@BasePath;", proxyMapping);
                    }
                    else
                    {
                        await connection.ExecuteAsync(@"INSERT INTO proxy_mappings (base_path, proxy_to_base_url) VALUES (@BasePath, @ProxyToBaseUrl);", proxyMapping);
                    }

                    existingProxies.RemoveAll(existingProxy => existingProxy.BasePath == proxyMapping.BasePath);
                }

                // Anything remaining should be deleted.
                foreach (ProxyMapping proxyMapping in existingProxies)
                {
                    await connection.ExecuteAsync(@"DELETE FROM proxy_mappings WHERE base_path=@BasePath;", proxyMapping);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task SaveSettingsAsync(IEnumerable<Setting> settings)
        {
            using var connection = new SqliteConnection(ConnectionString);

            try
            {
                foreach (Setting setting in settings)
                {
                    await connection.ExecuteAsync(@"UPDATE settings SET value=@Value WHERE key=@Key;", setting);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Mock>> GetAllMocksAsync()
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryAsync<Mock>("SELECT id, priority, name, description, parameters, trigger, response_status, response_headers, response_body FROM mocks;");
        }

        public async Task AddMockAsync(Mock mock)
        {
            using var connection = new SqliteConnection(ConnectionString);

            await connection.ExecuteAsync(@"INSERT INTO mocks (priority, name, description, parameters, trigger, response_status, response_headers, response_body)
                VALUES (@Priority, @Name, @Description, @Parameters, @Trigger, @ResponseStatus, @ResponseHeaders, @ResponseBody);", mock);
        }

        public async Task UpdateMockAsync(Mock mock)
        {
            using var connection = new SqliteConnection(ConnectionString);

            try
            {
                await connection.ExecuteAsync(@"UPDATE mocks SET priority=@Priority, name=@Name, description=@Description, parameters=@Parameters, trigger=@Trigger, 
                    response_status=@ResponseStatus, response_headers=@ResponseHeaders, response_body=@ResponseBody WHERE id=@Id;", mock);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteMockAsync(long id)
        {
            try
            {
                using var connection = new SqliteConnection(ConnectionString);
                await connection.ExecuteAsync(@"DELETE FROM mocks WHERE id=@Id;", new { Id = id });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
