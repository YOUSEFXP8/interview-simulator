namespace Application.DTOs.Question;

public class QuestionDto
{
    public Guid Id { get; set; }

    public string Content { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;
}