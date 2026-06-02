namespace Application.DTOs.Answer;

public class SubmitAnswerRequestDto
{
    public Guid QuestionId { get; set; }

    public string Content { get; set; } = string.Empty;
}