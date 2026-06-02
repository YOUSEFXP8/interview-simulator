using Application.DTOs.Answer;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class AnswerService : IAnswerService
{
    private readonly AppDbContext _context;

    public AnswerService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AnswerDto> SubmitAsync(
        SubmitAnswerRequestDto request)
    {
        var question = await _context.Questions
            .FirstOrDefaultAsync(q =>
                q.Id == request.QuestionId);

        if (question == null)
        {
            throw new Exception("Question not found.");
        }

        var answer = new Answer
        {
            Id = Guid.NewGuid(),
            QuestionId = request.QuestionId,
            InterviewSessionId =
                question.InterviewSessionId,
            Content = request.Content,
            SubmittedAt = DateTime.UtcNow
        };

        _context.Answers.Add(answer);

        await _context.SaveChangesAsync();

        return new AnswerDto
        {
            Id = answer.Id,
            QuestionId = answer.QuestionId,
            Content = answer.Content,
            SubmittedAt = answer.SubmittedAt
        };
    }

    public async Task<List<AnswerDto>>
        GetQuestionAnswersAsync(Guid questionId)
    {
        return await _context.Answers
            .Where(a => a.QuestionId == questionId)
            .OrderBy(a => a.SubmittedAt)
            .Select(a => new AnswerDto
            {
                Id = a.Id,
                QuestionId = a.QuestionId,
                Content = a.Content,
                SubmittedAt = a.SubmittedAt
            })
            .ToListAsync();
    }
}