using Application.DTOs.Interview;

namespace Application.Interfaces;

public interface IInterviewService
{
    Task<InterviewSessionDto> CreateAsync(
        Guid userId,
        CreateInterviewRequestDto request);

    Task<InterviewSessionDto?> GetByIdAsync(
        Guid sessionId);

    Task<List<InterviewSessionDto>> GetUserSessionsAsync(
        Guid userId);

    Task CompleteAsync(
        Guid sessionId);
}