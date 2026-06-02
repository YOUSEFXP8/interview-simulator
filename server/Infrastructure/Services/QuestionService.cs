using Application.DTOs.Question;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class QuestionService : IQuestionService
{
    private readonly AppDbContext _context;
    private readonly IQuestionGenerationService _generator;

    public QuestionService(
        AppDbContext context,
        IQuestionGenerationService generator)
    {
        _context = context;
        _generator = generator;
    }

    public async Task<List<QuestionDto>> GenerateAsync(
        Guid interviewSessionId,
        int count)
    {
        var session = await _context.InterviewSessions
            .FirstOrDefaultAsync(x =>
                x.Id == interviewSessionId);

        if (session == null)
        {
            throw new Exception(
                "Interview session not found.");
        }
        var userId = session.UserId;
        var resume = await _context.Resumes
    .Where(r => r.UserId == userId)
    .OrderByDescending(r => r.UploadedAt)
    .FirstOrDefaultAsync();

        var skills =
    string.IsNullOrWhiteSpace(
        resume?.ExtractedSkills)
    ? null
    : resume.ExtractedSkills;
        var generatedQuestions =
            await _generator.GenerateQuestionsAsync(
                session.Role,
                session.Difficulty,
                count,
                skills
                );

        foreach (var questionDto in generatedQuestions)
        {
            _context.Questions.Add(new Question
            {
                Id = questionDto.Id,
                InterviewSessionId = interviewSessionId,
                Content = questionDto.Content,
                Category = questionDto.Category
            });
        }

        await _context.SaveChangesAsync();

        return generatedQuestions;
    }

    public async Task<List<QuestionDto>>
        GetSessionQuestionsAsync(
            Guid interviewSessionId)
    {
        return await _context.Questions
            .Where(q =>
                q.InterviewSessionId ==
                interviewSessionId).OrderBy(t => t.CreatedAt)
            .Select(q => new QuestionDto
            {
                Id = q.Id,
                Content = q.Content,
                Category = q.Category
            })
            .ToListAsync();
    }
}