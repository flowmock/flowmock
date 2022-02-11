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
        private List<string> RequestFields = new List<string> { "id", "timestamp", "url", "request_method", "request_headers", "request_body", "response_status", "response_headers", "response_body", "mock_id" };
        private List<string> MockFields = new List<string> { "id", "priority", "name", "description", "parameters", "trigger", "response_status", "response_headers", "response_body" };

        public async Task<Request> AddRequestAsync(Request request)
        {
            using var connection = new SqliteConnection(ConnectionString);

            await connection.ExecuteAsync(@"INSERT INTO requests (timestamp, url, request_method, request_headers, request_body, response_status, response_headers, response_body, mock_id)
                VALUES (@Timestamp, @Url, @RequestMethod, @RequestHeaders, @RequestBody, @ResponseStatus, @ResponseHeaders, @ResponseBody, @MockId);", request);

            request.Id = await connection.ExecuteScalarAsync<long>("select last_insert_rowid()");

            return request;
        }

        public async Task<IEnumerable<ProxyMapping>> GetAllProxyMappingsAsync()
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryAsync<ProxyMapping>("SELECT base_path, proxy_to_base_url FROM proxy_mappings;");
        }

        public async Task<IEnumerable<Request>> GetAllRequestsAsync(FilterAndProjectionQuery filterAndProjectionQuery)
        {
            List<string> fields = new List<string>();
            if (filterAndProjectionQuery.Fields == "all")
            {
                fields.AddRange(RequestFields);
            }
            else
            {
                foreach(string field in filterAndProjectionQuery.Fields.Split(","))
                {
                    if(RequestFields.Contains(field))
                    {
                        fields.Add(field);
                    }
                }
            }            

            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryAsync<Request>($"SELECT {string.Join(", ", fields)} FROM requests limit {filterAndProjectionQuery.Limit} offset {filterAndProjectionQuery.Offset};");
        }

        public async Task<Request> GetRequestByIdAsync(long id)
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryFirstAsync<Request>($"SELECT {string.Join(", ", RequestFields)} FROM requests where id=@Id;", new { Id = id });
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

        public async Task<IEnumerable<Mock>> GetAllMocksAsync(FilterAndProjectionQuery filterAndProjectionQuery)
        {
            List<string> fields = new List<string>();
            if (filterAndProjectionQuery.Fields == "all")
            {
                fields.AddRange(MockFields);
            }
            else
            {
                foreach (string field in filterAndProjectionQuery.Fields.Split(","))
                {
                    if (MockFields.Contains(field))
                    {
                        fields.Add(field);
                    }
                }
            }

            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryAsync<Mock>($"SELECT {string.Join(", ", fields)} FROM mocks limit {filterAndProjectionQuery.Limit} offset {filterAndProjectionQuery.Offset};");
        }

        public async Task<Mock> GetMockByIdAsync(long id)
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryFirstAsync<Mock>($"SELECT {string.Join(", ", MockFields)} FROM mocks where id=@Id;", new { Id = id });
        }

        public async Task<Mock> AddMockAsync(Mock mock)
        {
            using var connection = new SqliteConnection(ConnectionString);

            await connection.ExecuteAsync(@"INSERT INTO mocks (priority, name, description, parameters, trigger, response_status, response_headers, response_body)
                VALUES (@Priority, @Name, @Description, @Parameters, @Trigger, @ResponseStatus, @ResponseHeaders, @ResponseBody);", mock);

            mock.Id = await connection.ExecuteScalarAsync<long>("select last_insert_rowid()");

            return mock;
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
