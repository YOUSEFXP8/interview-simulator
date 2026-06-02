using Application.DTOs.Interview;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Interview_API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class InterviewController : ControllerBase
{
    private readonly IInterviewService _interviewService;

    public InterviewController(IInterviewService interviewService)
    {
        _interviewService = interviewService;
    }

    [HttpPost]
    public async Task<ActionResult<InterviewSessionDto>> Create(
        CreateInterviewRequestDto request)
    {
        var userIdClaim =
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst("sub")?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim);

        var result =
            await _interviewService.CreateAsync(userId, request);

        return Ok(result);
    }

    [HttpGet("user")]
    public async Task<ActionResult<List<InterviewSessionDto>>> GetUserSessions()
    {
        var userIdClaim =
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst("sub")?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = Guid.Parse(userIdClaim);

        var sessions =
            await _interviewService.GetUserSessionsAsync(userId);

        return Ok(sessions);
    }
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<InterviewSessionDto>> GetById(Guid id)
    {
        var session = await _interviewService.GetByIdAsync(id);

        if (session == null)
        {
            return NotFound();
        }

        return Ok(session);
    }
    [HttpPut("{id:guid}/complete")]
    public async Task<IActionResult> Complete(Guid id)
    {
        await _interviewService.CompleteAsync(id);

        return NoContent();
    }
}