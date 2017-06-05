using System.Collections.Generic;
using boilerplate_typescript_react_redux_netcore_docker.Model;
using Microsoft.AspNetCore.Mvc;

namespace boilerplate_typescript_react_redux_netcore_docker.Controllers
{
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly PostRepository _postRepository;
        
        public PostController(PostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IEnumerable<Post> Get()
        {
            return _postRepository.GetAll();
        }
 
        [HttpGet("{id}")]
        public Post Get(int id)
        {
            return _postRepository.GetById(id);
        }
 
        [HttpPost]
        public void Post([FromBody]Post prod)
        {
            if (ModelState.IsValid)
                _postRepository.Add(prod);
        }
 
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Post prod)
        {
            prod.PostId = id;
            if (ModelState.IsValid)
                _postRepository.Update(prod);
        }
 
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _postRepository.Delete(id);
        }
    }
}