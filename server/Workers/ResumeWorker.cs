using Application.Interfaces;
using Application.Messaging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace Workers;

public class ResumeWorker : BackgroundService
{
    private readonly ILogger<ResumeWorker> _logger;
    private readonly RabbitMQSettings _settings;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public ResumeWorker(
        ILogger<ResumeWorker> logger,
        IOptions<RabbitMQSettings> options,
        IServiceScopeFactory scopeFactory,
        HttpClient httpClient,
        IConfiguration configuration)
    {
        _logger = logger;
        _settings = options.Value;
        _scopeFactory = scopeFactory;
        _httpClient = httpClient;
        _configuration = configuration;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {

        _logger.LogInformation(
    "RabbitMQ Config -> Host={Host}, User={User}, Queue={Queue}",
    _settings.HostName,
    _settings.UserName,
    _settings.ResumeQueueName);

        var factory = new ConnectionFactory
        {
            HostName = _settings.HostName,
            UserName = _settings.UserName,
            Password = _settings.Password
        };

        var connection =
            await factory.CreateConnectionAsync();

        var channel =
            await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(
            queue: _settings.ResumeQueueName,
            durable: true,
            exclusive: false,
            autoDelete: false);

        var consumer =
            new AsyncEventingBasicConsumer(channel);

        consumer.ReceivedAsync += async (sender, ea) =>
        {
            try
            {
                var body = ea.Body.ToArray();

                var json =
                    Encoding.UTF8.GetString(body);

                var message =
                    JsonSerializer.Deserialize<ResumeUploadedEvent>(
                        json);

                if (message is not null)
                {
                    using var scope =
                        _scopeFactory.CreateScope();

                    var processor =
                        scope.ServiceProvider
                            .GetRequiredService<IResumeProcessingService>();

                    await processor.ProcessResumeAsync(
                        message.ResumeId);

                    var baseUrl = _configuration["ApiBaseUrl"] ?? "https://localhost:7265";
                    await _httpClient.PostAsJsonAsync(
    $"{baseUrl}/api/notifications/resume-processed",
    new ResumeProcessedNotification
    {
        ResumeId = message.ResumeId
    });

                    _logger.LogInformation(
                        "Resume processed successfully: {ResumeId}",
                        message.ResumeId);
                }

                await channel.BasicAckAsync(
                    deliveryTag: ea.DeliveryTag,
                    multiple: false);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error processing resume message");

                await channel.BasicNackAsync(
                    deliveryTag: ea.DeliveryTag,
                    multiple: false,
                    requeue: true);
            }
        };

        await channel.BasicConsumeAsync(
            queue: _settings.ResumeQueueName,
            autoAck: false,
            consumer: consumer);

        _logger.LogInformation(
            "Resume worker started. Listening on queue: {QueueName}",
            _settings.ResumeQueueName);

        await Task.Delay(
            Timeout.Infinite,
            stoppingToken);
    }
}