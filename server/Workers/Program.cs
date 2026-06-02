using Application.Interfaces;
using Infrastructure.Persistence;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;


using Workers;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.Configure<RabbitMQSettings>(
    builder.Configuration.GetSection("RabbitMQ"));

builder.Services.AddHostedService<Worker>();
builder.Services.AddHostedService<ResumeWorker>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<
    IEvaluationService,
    EvaluationService>();

builder.Services.AddHttpClient<IAIProvider, GeminiProvider>();

builder.Services.AddScoped<
    IResumeProcessingService,
    ResumeProcessingService>();

var host = builder.Build();
host.Run();