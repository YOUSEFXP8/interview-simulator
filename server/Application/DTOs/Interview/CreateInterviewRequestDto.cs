namespace Application.DTOs.Interview;

public class CreateInterviewRequestDto
{
    public string Role { get; set; } = string.Empty;

    public string Difficulty { get; set; } = string.Empty;
}