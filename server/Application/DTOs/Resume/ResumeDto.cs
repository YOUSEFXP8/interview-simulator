namespace Application.DTOs.Resume;

public class ResumeDto
{
    public Guid Id { get; set; }

    public string FileName { get; set; } = string.Empty;

    public string ExtractedSkills { get; set; } = string.Empty;

    public DateTime UploadedAt { get; set; }
}