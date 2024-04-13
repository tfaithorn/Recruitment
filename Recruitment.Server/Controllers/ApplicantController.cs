using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Recruitment.Server.Dtos;
using Recruitment.Server.Services;

namespace Recruitment.Server.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ApplicantController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var applicantService = new ApplicantService();
        var applicantCriteria = new ApplicantCriteria();
        return Ok(applicantService.FindBy(applicantCriteria));
    }

    [HttpPost("findBy")]
    public IActionResult FindBy(ApplicantCriteria applicantCriteria)
    {
        var applicantService = new ApplicantService();
        return Ok(applicantService.FindBy(applicantCriteria));
    }
}
