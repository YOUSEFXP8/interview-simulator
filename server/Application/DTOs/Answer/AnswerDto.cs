namespace Application.DTOs.Answer;

public class AnswerDto
{
    public Guid Id { get; set; }

    public Guid QuestionId { get; set; }

    public string Content { get; set; } = string.Empty;

    public DateTime SubmittedAt { get; set; }
}