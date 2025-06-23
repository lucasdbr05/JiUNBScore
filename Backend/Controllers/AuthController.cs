using Backend.Services;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService AuthService;

    public AuthController(AuthService AuthService)
    {
        this.AuthService = AuthService;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginViewModel data)
    {
        var access_token = AuthService.Login(data);

        if (access_token == null)
            return BadRequest("Usuário não existe ou senha inválida");

        return Ok(new { access_token });
    }
    
    [HttpPost("signUp")]
    public IActionResult SignUp(SignUpViewModel data)
    {

        var resultado = AuthService.SignUp(data);

        if (resultado != "OK!")
            return BadRequest(resultado);

        return Ok(resultado);
    }
}