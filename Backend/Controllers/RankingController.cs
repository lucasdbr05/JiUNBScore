using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.ViewModels;
using System.Collections.Generic;

namespace Backend.Controllers;

[ApiController]
[Route("ranking")]
public class RankingController : ControllerBase
{
    private readonly RankingService rankingService;
    public RankingController(RankingService rankingService)
    {
        this.rankingService = rankingService;
    }

    [HttpGet]
    public ActionResult<List<RankingAtletaViewModel>> GetRanking([FromQuery] int edicaoId)
    {
        var ranking = rankingService.GetRankingByEdition(edicaoId);
        return Ok(ranking);
    }
}
