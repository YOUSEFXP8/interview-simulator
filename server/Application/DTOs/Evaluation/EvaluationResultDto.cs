namespace Application.DTOs.Evaluation;

public class EvaluationResultDto
{
    public int Score { get; set; }

    public string Strengths { get; set; } = string.Empty;

    public string Weaknesses { get; set; } = string.Empty;

    public string Feedback { get; set; } = string.Empty;
}