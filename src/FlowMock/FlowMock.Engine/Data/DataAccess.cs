using Dapper;
using FlowMock.Engine.Models;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlowMock.Engine.Data
{
    public class DataAccess : IDataAccess
    {
        private const string ConnectionString = "Data Source=FlowMock.sqlite";

        public async Task AddRequestAsync(Request request)
        {
            using var connection = new SqliteConnection(ConnectionString);

            try
            {
                await connection.ExecuteAsync(@"INSERT INTO requests (timestamp, url, request_method, request_headers, request_body, response_status, response_headers, response_body)
                VALUES (@Timestamp, @Url, @RequestMethod, @RequestHeaders, @RequestBody, @ResponseStatus, @ResponseHeaders, @ResponseBody);", request);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<IEnumerable<Request>> GetAllRequestsAsync()
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryAsync<Request>("SELECT id, timestamp, url, request_method, request_headers, request_body, response_status, response_headers, response_body FROM requests;");
        }

        public async Task<IEnumerable<Setting>> GetAllSettingsAsync()
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryAsync<Setting>("SELECT key, value FROM settings;");
        }

        public async Task<Setting> GetSettingsByKeyAsync(string key)
        {
            using var connection = new SqliteConnection(ConnectionString);
            return await connection.QueryFirstAsync<Setting>("SELECT key, value FROM settings WHERE key=@key;", key);
        }
    }
}
