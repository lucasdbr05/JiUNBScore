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

    [HttpPost()]
    public IActionResult RegsComp(RegsCompetidorViewModel regComp)
    {

        var result = CompService.RegsComp(regComp);

        if (result == null)
            return BadRequest("Esse competidor já foi registrado!");

        return Ok(result);
    }
    [HttpGet]
    public IActionResult FindAll()
    {

        var listComps = CompService.FindAll();

        return Ok(listComps);
    }
    [HttpGet("{matricula}")]
    public IActionResult FindComp(string matricula)
    {

        var result = CompService.CompetidorFinder(matricula);

        if (result == null) return BadRequest(result);
        return Ok(result);
    }

    [HttpPut("{matricula}")]
    public IActionResult Update(string matricula, UpdateCompetidorViewModel updtComp)
    {

        var result = CompService.Update(matricula, updtComp);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpDelete("{matricula}")]
    public IActionResult Delete(string matricula)
    {

        var result = CompService.Delete(matricula);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }
}