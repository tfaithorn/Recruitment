using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Recruitment.Server.Dtos;
using Recruitment.Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Recruitment.Server.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PositionController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var positionService = new PositionService();
        var positionCriteria = new PositionCriteria();
        return Ok(positionService.FindBy(positionCriteria));
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var positionService = new PositionService();
        var positionCriteria = new PositionCriteria() { id = id };
        var res = positionService.FindBy(positionCriteria);

        if (res.Count > 0)
        {
            return Ok(res[0]);
        }
        return NotFound();
    }

    [HttpPost]
    public async Task<Position> Post(PositionInput positionInput)
    {
        var positionService = new PositionService();
        return await positionService.Create(positionInput);
    }

    [HttpPost("FindBy")]
    public IActionResult FindBy(PositionCriteria criteria)
    {
        var positionService = new PositionService();
        return Ok(positionService.FindBy(criteria));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([FromRoute] int id, [FromBody] PositionInput positionInput)
    {
        var positionService = new PositionService();
        return Ok(await positionService.Update(id, positionInput));
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
