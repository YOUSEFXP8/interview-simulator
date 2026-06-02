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

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly RabbitMQSettings _settings;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly HttpClient _httpClient;

    public Worker(
     ILogger<Worker> logger,
     IOptions<RabbitMQSettings> options,
     IServiceScopeFactory scopeFactory,
     HttpClient httpClient)
    {
        _logger = logger;
        _settings = options.Value;
        _scopeFactory = scopeFactory;
        _httpClient = httpClient;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        var factory = new ConnectionFactory
        {
            HostName = _settings.HostName,
            UserName = _settings.UserName,
            Password = _settings.Password
        };

        var connection = await factory.CreateConnectionAsync();
        var channel = await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(
            queue: _settings.EvaluationQueueName,
            durable: true,
            exclusive: false,
            autoDelete: false);

        var consumer = new AsyncEventingBasicConsumer(channel);

        consumer.ReceivedAsync += async (sender, ea) =>
        {
            try
            {
                var body = ea.Body.ToArray();

                var json = Encoding.UTF8.GetString(body);

                var message = JsonSerializer.Deserialize<EvaluationRequestedEvent>(json);

                if (message is not null)
                {
                    using var scope = _scopeFactory.CreateScope();

                    var evaluationService =
                        scope.ServiceProvider
                             .GetRequiredService<IEvaluationService>();

                    var result = await evaluationService
                        .EvaluateAnswerAsync(message!.AnswerId);

                    await _httpClient.PostAsJsonAsync(
    "https://localhost:7265/api/notifications/evaluation-completed",
    new
    {
        result.AnswerId,
        EvaluationId = result.Id,
        result.Score
    });

                    _logger.LogInformation(
                        "Evaluation completed for AnswerId: {AnswerId}",
                        message.AnswerId);
                }

                await channel.BasicAckAsync(
                    deliveryTag: ea.DeliveryTag,
                    multiple: false);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error processing RabbitMQ message");
            }
        };

        await channel.BasicConsumeAsync(
            queue: _settings.EvaluationQueueName,
            autoAck: false,
            consumer: consumer);

        _logger.LogInformation(
            "RabbitMQ consumer started. Listening on queue: {QueueName}",
            _settings.EvaluationQueueName);

        await Task.Delay(
            Timeout.Infinite,
            stoppingToken);
    }
}