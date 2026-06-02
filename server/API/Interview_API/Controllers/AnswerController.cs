using Application.DTOs.Answer;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Interview_API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AnswerController : ControllerBase
{
    private readonly IAnswerService _answerService;

    public AnswerController(
        IAnswerService answerService)
    {
        _answerService = answerService;
    }

    [HttpPost]
    public async Task<ActionResult<AnswerDto>> Submit(
        SubmitAnswerRequestDto request)
    {
        var result =
            await _answerService.SubmitAsync(request);

        return Ok(result);
    }

    [HttpGet("question/{id:guid}")]
    public async Task<ActionResult<List<AnswerDto>>> GetQuestionAnswers(
        Guid id)
    {
        var result =
            await _answerService
                .GetQuestionAnswersAsync(id);

        return Ok(result);
    }
}