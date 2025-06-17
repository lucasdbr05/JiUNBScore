using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/athletic")]
[ApiController]
public class AthleticController : ControllerBase
{
    private readonly AthleticService AthleticService;

    public AthleticController(AthleticService athleticService)
    {
        AthleticService = athleticService;
    }

    [HttpPost]
    public IActionResult Create(CreateAthleticViewModel data)
    {
        var atletica = AthleticService.Create(data);
        return Ok(atletica);
    }

    [HttpGet]
    public IActionResult FindAll()
    {
        var atleticas = AthleticService.FindAll();
        return Ok(atleticas);
    }

    [HttpGet("{id}")]
    public IActionResult FindOne(int id)
    {
        var atletica = AthleticService.FindOne(id);
        if (atletica == null)
            return NotFound();
        return Ok(atletica);
    }

    [HttpPut]
    public IActionResult Update(UpdateAthleticViewModel data)
    {
        var atletica = AthleticService.Update(data);
        if (atletica == null)
            return NotFound();
        return Ok(atletica);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var atletica = AthleticService.Delete(id);
        if (atletica == null)
            return NotFound();
        return Ok(atletica);
    }
}
