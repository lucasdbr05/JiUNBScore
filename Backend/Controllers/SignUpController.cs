using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/SignUp")]
[ApiController]
public class SignUpController : ControllerBase
{
    private readonly SignUpService SignUpService;

    public SignUpController(SignUpService signUpService)
    {
        this.SignUpService = signUpService;
    }

    [HttpPost("signUp")]
    public IActionResult SignUp(SignUpViewModel data)
    {

        var resultado = SignUpService.SignUp(data);

        if (resultado != "OK!")
            return BadRequest(resultado);

        return Ok(resultado);
    }
}