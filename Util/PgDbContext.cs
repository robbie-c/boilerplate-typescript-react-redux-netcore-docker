using System;
using System.Data;
using Microsoft.Extensions.Options;
using Npgsql;

namespace boilerplate_typescript_react_redux_netcore_docker.Util
{
    public class PgDbContext : IDbContext
    {
        private readonly DbConnectionOptions _connectionOptions;
        private IDbConnection _connection;
        private bool _isDisposed = false;

        public PgDbContext(IOptions<DbConnectionOptions> optionsAccessor)
        {
            _connectionOptions = optionsAccessor.Value;
        }
        
        public IDbConnection Connection()
        {
            if (_isDisposed)
            {
                throw new ObjectDisposedException("Tried to get Connection while Disposed");
            }
            if (_connection == null)
            {
                _connection = new NpgsqlConnection(_connectionOptions.DbConnectionString);
            }
            return _connection;
        }

        public void Dispose()
        {
            _isDisposed = true;
            _connection?.Dispose();
        }
    }
}