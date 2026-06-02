namespace Application.DTOs.Interview;

public class InterviewSessionDto
{
    public Guid Id { get; set; }

    public string Role { get; set; } = string.Empty;

    public string Difficulty { get; set; } = string.Empty;

    public DateTime StartedAt { get; set; }

    public DateTime? CompletedAt { get; set; }
}