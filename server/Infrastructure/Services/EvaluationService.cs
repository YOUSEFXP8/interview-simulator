using Application.DTOs.Evaluation;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;


namespace Infrastructure.Services;

public class EvaluationService : IEvaluationService
{
    private readonly AppDbContext _context;
    private readonly IAIProvider _aiProvider;


    public EvaluationService(AppDbContext context, IAIProvider aiProvider)
    {
        _context = context;
        _aiProvider = aiProvider;
    }

    public async Task<EvaluationDto> EvaluateAnswerAsync(
        Guid answerId)
    {
        var existingEvaluation = await _context.Evaluations
            .FirstOrDefaultAsync(e => e.AnswerId == answerId);

        if (existingEvaluation != null)
        {
            return new EvaluationDto
            {
                Id = existingEvaluation.Id,
                AnswerId = existingEvaluation.AnswerId,
                Score = existingEvaluation.Score,
                Strengths = existingEvaluation.Strengths,
                Weaknesses = existingEvaluation.Weaknesses,
                Feedback = existingEvaluation.Feedback
            };
        }

        var answer = await _context.Answers
            .Include(a => a.Question)
            .FirstOrDefaultAsync(a => a.Id == answerId);
      

        if (answer == null)
        {
            throw new Exception("Answer not found.");
        }

        var aiResponse =
    await _aiProvider.EvaluateAnswerAsync(
        answer.Question.Content,
        answer.Content);

        var result =
    JsonSerializer.Deserialize<EvaluationResultDto>(
        aiResponse,
        new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });
        if (result == null)
        {
            throw new Exception(
                "Failed to parse AI evaluation.");
        }
        var evaluation = new Evaluation
        {
            Id = Guid.NewGuid(),
            AnswerId = answerId,
            Score = result.Score,
            Strengths = result.Strengths,
            Weaknesses = result.Weaknesses,
            Feedback = result.Feedback
        };

        _context.Evaluations.Add(evaluation);

        await _context.SaveChangesAsync();

        return new EvaluationDto
        {
            Id = evaluation.Id,
            AnswerId = evaluation.AnswerId,
            Score = evaluation.Score,
            Strengths = evaluation.Strengths,
            Weaknesses = evaluation.Weaknesses,
            Feedback = evaluation.Feedback
        };
    }

    public async Task<EvaluationDto?> GetByAnswerIdAsync(
        Guid answerId)
    {
        var evaluation = await _context.Evaluations
            .FirstOrDefaultAsync(e =>
                e.AnswerId == answerId);

        if (evaluation == null)
        {
            return null;
        }

        return new EvaluationDto
        {
            Id = evaluation.Id,
            AnswerId = evaluation.AnswerId,
            Score = evaluation.Score,
            Strengths = evaluation.Strengths,
            Weaknesses = evaluation.Weaknesses,
            Feedback = evaluation.Feedback
        };
    }
}