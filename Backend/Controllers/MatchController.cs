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

    [HttpPost()]
    public IActionResult RegsMatch(RegisterMatchViewModel regMatch)
    {
        var result = MatchService.RegisterMatch(regMatch);
        if (result == null)
            return BadRequest("Essa partida já foi adicionada!");
        return Ok(result);
    }

    [HttpGet]
    public IActionResult FindAll()
    {
        var matches = MatchService.FindAll();
        return Ok(matches);
    }

    [HttpGet("{id}")]
    public IActionResult FindOne(int id)
    {
        var match = MatchService.FindOne(id);
        if (match == null)
            return NotFound();
        return Ok(match);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateMatchViewModel data)
    {
        var match = MatchService.Update(id, data);
        if (match == null)
            return NotFound();
        return Ok(match);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var match = MatchService.Delete(id);
        if (match == null)
            return NotFound();
        return Ok(match);
    }
}