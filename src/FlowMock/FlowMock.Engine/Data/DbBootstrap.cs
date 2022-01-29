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
                value VARCHAR(1000) NULL
                );");

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
        }
    }
}
