using Application.DTOs.Resume;

namespace Application.Interfaces;

public interface IResumeService
{
    Task<ResumeDto> UploadAsync(
    Guid userId,
    string fileName,
    string filePath);

    Task<ResumeDto?> GetAsync(
        Guid resumeId);
}