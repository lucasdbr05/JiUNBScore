using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/fase")]
[ApiController]
public class FaseController : ControllerBase
{
    private readonly FaseService FaseService;

    public FaseController(FaseService FaseService)
    {
        this.FaseService = FaseService;
    }

    [HttpPost]
    public IActionResult Create(CreateFaseViewModel data)
    {
        var fase = FaseService.Create(data);
        return Ok(fase);
    }

    [HttpGet]
    public IActionResult FindAll()
    {
        var fases = FaseService.FindAll();
        return Ok(fases);
    }

    [HttpGet("{id}")]
    public IActionResult FindOne(int id)
    {
        var fase = FaseService.FindOne(id);
        if (fase == null)
            return NotFound();
        return Ok(fase);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, CreateFaseViewModel data)
    {
        var fase = FaseService.Update(id, data);
        if (fase == null)
            return NotFound();
        return Ok(fase);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var fase = FaseService.Delete(id);
        if (fase == null)
            return NotFound();
        return Ok(fase);
    }
}