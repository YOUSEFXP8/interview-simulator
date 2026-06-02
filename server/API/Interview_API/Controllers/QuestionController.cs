using Application.DTOs.Question;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Interview_API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class QuestionController : ControllerBase
{
    private readonly IQuestionService _questionService;

    public QuestionController(
        IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpPost("generate")]
    public async Task<ActionResult<List<QuestionDto>>> Generate(
        GenerateQuestionsRequestDto request)
    {
        var result =
            await _questionService.GenerateAsync(
                request.InterviewSessionId,
                request.Count);

        return Ok(result);
    }

    [HttpGet("session/{id:guid}")]
    public async Task<ActionResult<List<QuestionDto>>> GetSessionQuestions(
        Guid id)
    {
        var result =
            await _questionService.GetSessionQuestionsAsync(id);

        return Ok(result);
    }
}