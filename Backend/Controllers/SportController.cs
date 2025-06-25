using Backend.Services;
using Backend.ViewModels.Sport;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/sport")]
public class SportController : ControllerBase
{
    private readonly SportService SportService;
    public SportController(SportService service)
    {
        SportService = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var esportes = await SportService.GetAllAsync();
        return Ok(esportes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var esporte = await SportService.GetByIdAsync(id);
        if (esporte == null) return NotFound();
        return Ok(esporte);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSportViewModel model)
    {
        var esporte = await SportService.CreateAsync(model);
        return CreatedAtAction(nameof(GetById), new { id = esporte.Id }, esporte);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateSportViewModel model)
    {
        var esporte = await SportService.UpdateAsync(model);
        if (esporte == null) return NotFound();
        return Ok(esporte);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await SportService.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
