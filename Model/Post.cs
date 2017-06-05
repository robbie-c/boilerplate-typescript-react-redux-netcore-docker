using System.ComponentModel.DataAnnotations;

namespace boilerplate_typescript_react_redux_netcore_docker.Model
{
    public class Post
    {
        [Key]
        public int PostId { get; set; }
        public string Title { get; set; }
        public string ContentHtml { get; set; }
        public string Email { get; set; }
        public double Price { get; set; }
    }
}