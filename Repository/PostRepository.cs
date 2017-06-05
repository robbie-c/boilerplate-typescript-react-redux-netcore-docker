using System.Collections.Generic;
using System.Linq;
using boilerplate_typescript_react_redux_netcore_docker.Model;
using boilerplate_typescript_react_redux_netcore_docker.Util;
using Dapper;

public class PostRepository
{
    private readonly IDbContext _dbContext;

    public PostRepository(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void Add(Post post)
    {
        var dbConnection = _dbContext.Connection();
        const string sQuery = "INSERT INTO Posts (Title, ContentHtml, Email, Price)"
                              + " VALUES(@Title, @ContentHtml, @Email, @Price)";
        dbConnection.Open();
        dbConnection.Execute(sQuery, post);
    }

    public IEnumerable<Post> GetAll()
    {
        var dbConnection = _dbContext.Connection();
        
            dbConnection.Open();
            return dbConnection.Query<Post>("SELECT * FROM Posts");
        
    }

    public Post GetById(int id)
    {
        var dbConnection = _dbContext.Connection();
        
            const string sQuery = "SELECT * FROM Posts"
                                  + " WHERE PostId = @Id";
            dbConnection.Open();
            return dbConnection.Query<Post>(sQuery, new {Id = id}).FirstOrDefault();
        
    }

    public void Delete(int id)
    {
        var dbConnection = _dbContext.Connection();
        
            const string sQuery = "DELETE FROM Posts"
                                  + " WHERE PostId = @Id";
            dbConnection.Open();
            dbConnection.Execute(sQuery, new {Id = id});
        
    }

    public void Update(Post post)
    {
        var dbConnection = _dbContext.Connection();
        
            const string sQuery = "UPDATE Posts SET " +
                                  "Title = @Title, " +
                                  "ContentHtml = @ContentHtml, " +
                                  "Email= @Email " +
                                  "Price= @Price " +
                                  "WHERE ProductId = @ProductId";
            dbConnection.Open();
            dbConnection.Query(sQuery, post);
        
    }
}