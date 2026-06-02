using Application.DTOs.Question;

namespace Application.Interfaces;

public interface IQuestionService
{
    Task<List<QuestionDto>> GenerateAsync(
        Guid interviewSessionId,
        int count);

    Task<List<QuestionDto>> GetSessionQuestionsAsync(
        Guid interviewSessionId);
}