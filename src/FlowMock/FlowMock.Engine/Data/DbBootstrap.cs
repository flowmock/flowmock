using Dapper;
using Microsoft.Data.Sqlite;
using System.Linq;
using System.Threading.Tasks;

namespace FlowMock.Engine.Data
{
    public class DbBootstrap
    {
        public async Task SetupAsync()
        {
            using var connection = new SqliteConnection("Data Source=FlowMock.sqlite");

            var table = await connection.QueryAsync<string>("SELECT name FROM sqlite_master WHERE type='table' AND name = 'settings';");
            var tableName = table.FirstOrDefault();

            if (!string.IsNullOrEmpty(tableName) && tableName == "settings")
                return;

            await connection.ExecuteAsync(@"CREATE TABLE settings (
                key VARCHAR(100) NOT NULL,
                value VARCHAR(1000) NULL,
                description VARCHAR(500) NULL
                );");

            await connection.ExecuteAsync(@"INSERT INTO settings (key, value, description) values ('Proxy Base Path', '/proxy', 'The base path for all proxy requests.');");


            await connection.ExecuteAsync(@"CREATE TABLE proxy_mappings (
                base_path VARCHAR(1000) NOT NULL,
                proxy_to_base_url VARCHAR(1000) NOT NULL
                );");

            await connection.ExecuteAsync(@"INSERT INTO proxy_mappings (base_path, proxy_to_base_url) values ('chucknorris', 'https://api.chucknorris.io');");
            await connection.ExecuteAsync(@"INSERT INTO proxy_mappings (base_path, proxy_to_base_url) values ('excuse', 'https://excuser.herokuapp.com/v1/excuse');");

            await connection.ExecuteAsync(@"CREATE TABLE requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                timestamp INTEGER NULL,
                url VARCHAR(100) NULL,
                request_method VARCHAR(100) NULL,
                request_headers VARCHAR(10000) NULL,
                request_body VARCHAR(100000) NULL,
                response_status INTEGER NULL,
                response_headers VARCHAR(10000) NULL,
                response_body VARCHAR(100000) NULL
                );");
            
            await connection.ExecuteAsync(@"CREATE TABLE mocks (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                priority INTEGER NOT NULL,
                name VARCHAR(100) NULL,
                description VARCHAR(5000) NULL,
                parameters VARCHAR(10000) NULL,
                trigger VARCHAR(100000) NULL,
                response_status INTEGER NULL,
                response_headers VARCHAR(10000) NULL,
                response_body VARCHAR(100000) NULL
                );");

            await connection.ExecuteAsync("INSERT INTO mocks (priority, name, description, parameters, trigger, response_status, response_headers, response_body) values (100, 'A simple mock', 'A description for a simple mock', '[{\"name\": \"foo\", \"value\": \"bar\"}]', '{}', 200, '[]', 'A response from the simple mock.');");
        }
    }
}
