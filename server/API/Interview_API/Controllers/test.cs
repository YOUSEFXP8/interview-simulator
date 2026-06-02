using Interview_API.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Interview_API.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    private readonly IHubContext<EvaluationHub> _hubContext;

    public TestController(
        IHubContext<EvaluationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("signalr")]
    public async Task<IActionResult> SignalRTest()
    {
        await _hubContext.Clients.All.SendAsync(
            "EvaluationCompleted",
            new
            {
                Message = "SignalR Works",
                Time = DateTime.UtcNow
            });

        return Ok();
    }
}