using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/match")]
[ApiController]
public class MatchController : ControllerBase
{
    private readonly MatchService MatchService;

    public MatchController(MatchService matchService)
    {
        MatchService = matchService;
    }

    [HttpPost("register")]
    public IActionResult RegsMatch(RegisterMatchViewModel regMatch)
    {

        var result = MatchService.RegisterMatch(regMatch);

        if (result == null)
            return BadRequest("Essa partida já foi adicionada!");

        return Ok(result);
    }
}