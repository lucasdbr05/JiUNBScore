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
}