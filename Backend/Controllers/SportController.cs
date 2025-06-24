using Backend.Services;
using Backend.ViewModels.Sport;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/sport")]
public class SportController : ControllerBase
{
    private readonly SportService _service;
    public SportController(SportService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var esportes = await _service.GetAllAsync();
        return Ok(esportes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var esporte = await _service.GetByIdAsync(id);
        if (esporte == null) return NotFound();
        return Ok(esporte);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSportViewModel model)
    {
        var esporte = await _service.CreateAsync(model);
        return CreatedAtAction(nameof(GetById), new { id = esporte.Id }, esporte);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateSportViewModel model)
    {
        var esporte = await _service.UpdateAsync(model);
        if (esporte == null) return NotFound();
        return Ok(esporte);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
