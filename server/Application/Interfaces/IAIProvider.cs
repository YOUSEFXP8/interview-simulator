namespace Application.Interfaces;

public interface IAIProvider
{
    Task<string> GenerateQuestionsAsync(
        string role,
        string difficulty,
        int count, 
        string? skills);

    Task<string> EvaluateAnswerAsync(
        string question,
        string answer);
    Task<string> ExtractSkillsAsync(
        string resumeText);
}