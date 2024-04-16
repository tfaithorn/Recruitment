using Microsoft.AspNetCore.Mvc;
using Recruitment.Server.Dtos;
using Recruitment.Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Recruitment.Server.Controllers;
[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    // GET: api/<CategoryController>
    [HttpGet]
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }

    // GET api/<CategoryController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }

    // POST api/<CategoryController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    [HttpPost("findby")]
    public IActionResult FindBy(CategoryCriteria categoryCriteria)
    {
        var categoryService = new CategoryService();
        return Ok(categoryService.FindBy(categoryCriteria));
    }

    // PUT api/<CategoryController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<CategoryController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
