using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/edition")]
[ApiController]
public class EditionController : ControllerBase
{
    private readonly EditionService EditionService;

    public EditionController(EditionService editionService)
    {
        EditionService = editionService;
    }

    [HttpPost]
    public IActionResult Create(CreateEditionViewModel data)
    {
        var edicao = EditionService.Create(data);
        return Ok(edicao);
    }

    [HttpGet]
    public IActionResult FindAll([FromQuery(Name="idEsporte")] int? idEsporte)
    {
        var edicoes = EditionService.FindAll(idEsporte);
        return Ok(edicoes);
    }

    [HttpGet("{id}")]
    public IActionResult FindOne(int id)
    {
        var edicao = EditionService.FindOne(id);
        if (edicao == null)
            return NotFound();
        return Ok(edicao);
    }

    [HttpGet("standings")]
    public IActionResult GetStandings(
        [FromQuery(Name = "editionId")] int editionId,
        [FromQuery(Name = "sportId")] int sportId
    )
    {
        var standings = EditionService.GetStandingsAsProcedure(editionId, sportId);

        if (standings == null)
            return NotFound();

        return Ok(standings);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateEditionViewModel data)
    {
        var edicao = EditionService.Update(id, data);
        if (edicao == null)
            return NotFound();
        return Ok(edicao);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var edicao = EditionService.Delete(id);
        if (edicao == null)
            return NotFound();
        return Ok(edicao);
    }
}
