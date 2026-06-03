using Application.DTOs.Interview;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class InterviewService : IInterviewService
{
    private readonly AppDbContext _context;

    public InterviewService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<InterviewSessionDto> CreateAsync(
        Guid userId,
        CreateInterviewRequestDto request)
    {
        var session = new InterviewSession
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Role = request.Role,
            Difficulty = request.Difficulty,
            StartedAt = DateTime.UtcNow
        };

        _context.InterviewSessions.Add(session);

        await _context.SaveChangesAsync();

        return new InterviewSessionDto
        {
            Id = session.Id,
            Role = session.Role,
            Difficulty = session.Difficulty,
            StartedAt = session.StartedAt,
            CompletedAt = session.CompletedAt,
            AverageScore = 0
        };
    }

    public async Task<InterviewSessionDto?> GetByIdAsync(
        Guid sessionId)
    {
        var session = await _context.InterviewSessions
            .FirstOrDefaultAsync(x => x.Id == sessionId);

        if (session == null)
            return null;

        var averageScore = (int)(await _context.Evaluations
            .Where(e => e.Answer.InterviewSessionId == sessionId)
            .Select(e => (double?)e.Score)
            .AverageAsync() ?? 0);

        return new InterviewSessionDto
        {
            Id = session.Id,
            Role = session.Role,
            Difficulty = session.Difficulty,
            StartedAt = session.StartedAt,
            CompletedAt = session.CompletedAt,
            AverageScore = averageScore
        };
    }

    public async Task<List<InterviewSessionDto>> GetUserSessionsAsync(
        Guid userId)
    {
        return await _context.InterviewSessions
            .Where(x => x.UserId == userId)
            .Select(x => new InterviewSessionDto
            {
                Id = x.Id,
                Role = x.Role,
                Difficulty = x.Difficulty,
                StartedAt = x.StartedAt,
                CompletedAt = x.CompletedAt,
                AverageScore = (int)(_context.Evaluations
                    .Where(e => e.Answer.InterviewSessionId == x.Id)
                    .Select(e => (double?)e.Score)
                    .Average() ?? 0)
            })
            .ToListAsync();
    }

    public async Task CompleteAsync(Guid sessionId)
    {
        var session = await _context.InterviewSessions
            .FirstOrDefaultAsync(x => x.Id == sessionId);

        if (session == null)
            throw new Exception("Interview session not found.");

        session.CompletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
    }
}