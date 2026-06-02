using Application.DTOs.Evaluation;

namespace Application.Interfaces;

public interface IEvaluationService
{
    Task<EvaluationDto> EvaluateAnswerAsync(
        Guid answerId);

    Task<EvaluationDto?> GetByAnswerIdAsync(
        Guid answerId);
}