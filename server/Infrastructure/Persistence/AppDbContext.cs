using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<InterviewSession> InterviewSessions => Set<InterviewSession>();

    public DbSet<Question> Questions => Set<Question>();

    public DbSet<Answer> Answers => Set<Answer>();

    public DbSet<Evaluation> Evaluations => Set<Evaluation>();

    public DbSet<Resume> Resumes => Set<Resume>();
}