using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/estatisticas")]
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
}