using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/competidor")]
[ApiController]
public class CompController : ControllerBase
{
    private readonly CompetidorService CompService;

    public CompController(CompetidorService compService)
    {
        CompService = compService;
    }

    [HttpPost("register")]
    public IActionResult RegsComp(RegsCompetidorViewModel regComp)
    {

        var result = CompService.RegsComp(regComp);

        if (result == null)
            return BadRequest("Esse competidor já foi registrado!");

        return Ok(result);
    }
}