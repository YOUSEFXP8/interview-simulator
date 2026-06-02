using Application.DTOs.Answer;

namespace Application.Interfaces;

public interface IAnswerService
{
    Task<AnswerDto> SubmitAsync(
        SubmitAnswerRequestDto request);

    Task<List<AnswerDto>> GetQuestionAnswersAsync(
        Guid questionId);
}