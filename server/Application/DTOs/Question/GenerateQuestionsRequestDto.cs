namespace Application.DTOs.Question;

public class GenerateQuestionsRequestDto
{
    public Guid InterviewSessionId { get; set; }

    public int Count { get; set; } = 5;
}