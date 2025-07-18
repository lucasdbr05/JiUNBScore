using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.ViewModels;
using System.Collections.Generic;

namespace Backend.Controllers;

[ApiController]
[Route("api/ranking")]
public class RankingController : ControllerBase
{
    private readonly RankingService rankingService;
    public RankingController(RankingService rankingService)
    {
        this.rankingService = rankingService;
    }

    [HttpGet]
    public ActionResult<List<RankingAtletaViewModel>> GetRanking(
        [FromQuery(Name = "editionId")] int editionId,
        [FromQuery(Name = "sportId")] int sportId
    )
    {
        var ranking = rankingService.GetRankingByEdition(editionId, sportId);
        return Ok(ranking);
    }
}
