using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Interview_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly IAIProvider _aiProvider;

    public AiController(IAIProvider aiProvider)
    {
        _aiProvider = aiProvider;
    }

   
}