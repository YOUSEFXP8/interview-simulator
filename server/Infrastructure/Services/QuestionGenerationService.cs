using Application.DTOs.Question;
using Application.Interfaces;

namespace Infrastructure.Services;

public class QuestionGenerationService : IQuestionGenerationService
{
    private readonly IAIProvider _aiProvider;

    public QuestionGenerationService(
        IAIProvider aiProvider)
    {
        _aiProvider = aiProvider;
    }

    public async Task<List<QuestionDto>> GenerateQuestionsAsync(
    string role,
    string difficulty,
    int count,
    string? skills)
    {
        var response =
            await _aiProvider.GenerateQuestionsAsync(
                role,
                difficulty,
                count,
                skills);

        var lines = response
            .Split('\n', StringSplitOptions.RemoveEmptyEntries);

        var questions = new List<QuestionDto>();

        foreach (var line in lines)
        {
            questions.Add(new QuestionDto
            {
                Id = Guid.NewGuid(),
                Content = line.Trim(),
                Category = role
            });
        }

        return questions;
    }
}