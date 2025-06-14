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
    public IActionResult Login(LoginViewModel data) {
        var token = AuthService.Login(data);

        if (token == null)
            return BadRequest("Usuário não existe ou senha inválida");
     
        return Ok(token);
    }
}