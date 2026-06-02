using Application.DTOs.Evaluation;
using Application.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Interview_API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EvaluationController : ControllerBase
{
    private readonly IMessagePublisher _messagePublisher;
    private readonly IEvaluationService _evaluationService;


    public EvaluationController(
        IMessagePublisher messagePublisher, IEvaluationService evaluationService)
    {
        _messagePublisher = messagePublisher;
        _evaluationService = evaluationService;

    }



    [HttpPost("{answerId:guid}")]
    public async Task<IActionResult>
    Evaluate(Guid answerId)
    {
        await _messagePublisher
            .PublishEvaluationRequestedAsync(answerId);

        return Accepted(new
        {
            Message = "Evaluation queued successfully",
            AnswerId = answerId
        });
    }

    [HttpGet("{answerId:guid}")]
    public async Task<ActionResult<EvaluationDto>>
        Get(Guid answerId)
    {
        var result =
            await _evaluationService
                .GetByAnswerIdAsync(answerId);

        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }
}