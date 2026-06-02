using Application.DTOs.Resume;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class ResumeService : IResumeService
{
    private readonly AppDbContext _context;

    public ResumeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ResumeDto> UploadAsync(
        Guid userId,
        string fileName,
        string filePath)
    {
        var resume = new Resume
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            FileName = fileName,
            FilePath = filePath,
            UploadedAt = DateTime.UtcNow,
            ExtractedSkills = string.Empty
        };

        _context.Resumes.Add(resume);

        await _context.SaveChangesAsync();

        return new ResumeDto
        {
            Id = resume.Id,
            FileName = resume.FileName,
            ExtractedSkills = resume.ExtractedSkills,
            UploadedAt = resume.UploadedAt
        };
    }

    public async Task<ResumeDto?> GetAsync(
        Guid resumeId)
    {
        var resume = await _context.Resumes
            .FirstOrDefaultAsync(r => r.Id == resumeId);

        if (resume == null)
        {
            return null;
        }

        return new ResumeDto
        {
            Id = resume.Id,
            FileName = resume.FileName,
            ExtractedSkills = resume.ExtractedSkills,
            UploadedAt = resume.UploadedAt
        };
    }
}