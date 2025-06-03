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

    [HttpPost]
    public IActionResult Login(LoginViewModel data) {
        var token = AuthService.Login(data);
        Console.WriteLine(token);
        return Ok(token);
    }
}