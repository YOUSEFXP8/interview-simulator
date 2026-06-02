using Application.DTOs.Question;

namespace Application.Interfaces;

public interface IQuestionGenerationService
{
    Task<List<QuestionDto>> GenerateQuestionsAsync(
        string role,
        string difficulty,
        int count,
        string? skills);
}