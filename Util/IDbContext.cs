using System;
using System.Data;

namespace boilerplate_typescript_react_redux_netcore_docker.Util
{
    public interface IDbContext : IDisposable
    {
        IDbConnection Connection();
    }
}