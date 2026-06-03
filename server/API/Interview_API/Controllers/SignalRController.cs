using Interview_API.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

[ApiController]
[Route("api/signalr")]
[Route("api/notifications")]
public class SignalRController : ControllerBase
{
    private readonly IHubContext<EvaluationHub> _hubContext;

    public SignalRController(
        IHubContext<EvaluationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("evaluation-completed")]
    public async Task<IActionResult> EvaluationCompleted(
        EvaluationCompletedNotification request)
    {
        await _hubContext.Clients.All.SendAsync(
            "EvaluationCompleted",
            request);

        return Ok();
    }
    [HttpPost("resume-processed")]
    public async Task<IActionResult> ResumeProcessed(
    ResumeProcessedNotification request)
    {
        await _hubContext.Clients.All.SendAsync(
            "ResumeProcessed",
            request);

        return Ok();
    }
}