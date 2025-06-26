using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controllers;

[Route("api/local")]
[ApiController]
public class LocalController : ControllerBase
{

    private readonly LocalService LocServ;

    public LocalController(LocalService locServ)
    {

        LocServ = locServ;
    }

    [HttpGet()]
    public IActionResult FindAll()
    {

        return Ok(LocServ.FindAll());
    }

    [HttpGet("{id}")]
    public IActionResult FindOne(int id)
    {

        var result = LocServ.FindOne(id);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }
    
    [HttpPost()]
    public IActionResult RegsLocal(RegisterLocalViewModel regsLocal)
    {

        var result = LocServ.Create(regsLocal);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateLocal(int id, UpdateLocalViewModel updtLocal)
    {

        var result = LocServ.Update(id, updtLocal);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteLocal(int id)
    {

        var result = LocServ.Delete(id);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }
}