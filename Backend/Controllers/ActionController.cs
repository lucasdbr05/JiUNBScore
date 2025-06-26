using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/acao")]
[ApiController]
public class ActionController : ControllerBase
{

    private readonly ActionService ActServ;

    public ActionController(ActionService actServ)
    {
        ActServ = actServ;
    }

    [HttpPost()]
    public IActionResult RegsAction(RegisterActionViewModel regsAct)
    {

        return Ok(ActServ.Create(regsAct));
    }

    [HttpPut("{id}")]
    public IActionResult UpdateAction(int id, UpdateActionViewModel updtAct)
    {

        var result = ActServ.Update(id, updtAct);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAction(int id)
    {

        var result = ActServ.Delete(id);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public IActionResult FindOne(int id)
    {

        var result = ActServ.FindOne(id);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpGet()]
    public IActionResult FindAll()
    {

        var result = ActServ.FindAll();

        if (result == null) return BadRequest(result);

        return Ok(result);
    }

    [HttpGet("esporte/{id_esporte}")]
    public IActionResult FindPEsporte(int id_esporte)
    {

        var result = ActServ.FindPEsporte(id_esporte);

        if (result == null) return BadRequest(result);

        return Ok(result);
    }
}