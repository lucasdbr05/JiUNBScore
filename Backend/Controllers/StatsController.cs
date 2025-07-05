using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/statistic")]
[ApiController]
public class StatsController : ControllerBase
{
    private readonly EstatisticaService StatsService;

    public StatsController(EstatisticaService statsService)
    {
        StatsService = statsService;
    }

    [HttpPost()]
    public IActionResult RegsStat(RegsStatsViewModel regStat)
    {
        var result = StatsService.RegsStat(regStat);

        return Ok(result);
    }

    [HttpGet("partida/{id_partida:int}")]
    public IActionResult FindStatPartida(int id_partida)
    {

        var result = StatsService.FindStatPartida(id_partida);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpGet("competidor/{id_competidor}")]
    public IActionResult FindStatCompetidor(string id_competidor)
    {

        var result = StatsService.FindStatCompetidor(id_competidor);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpGet("acao/{id_acao:int}")]
    public IActionResult FindStatAcao(int id_acao)
    {

        var result = StatsService.FindStatAcao(id_acao);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult FindStat(int id)
    {

        var result = StatsService.FindStat(id);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpGet()]
    public IActionResult FindAll()
    {

        var result = StatsService.FindAll();

        return Ok(result);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, UpdateStatViewModel updtStat)
    {

        var result = StatsService.Update(id: id, updtStat: updtStat);

        if (result == null) return BadRequest(result);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {

        var result = StatsService.Delete(id: id);

        if (result == null) return BadRequest(result);
        return Ok(result);
    }
}