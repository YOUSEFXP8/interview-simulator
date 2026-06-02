using System.Text;
using System.Text.Json;
using Application.Interfaces;
using Application.Messaging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace Infrastructure.Messaging;

public class RabbitMQPublisher : IMessagePublisher
{
    private readonly RabbitMQSettings _settings;

    public RabbitMQPublisher(IOptions<RabbitMQSettings> options)
    {
        _settings = options.Value;
    }

    public async Task PublishEvaluationRequestedAsync(Guid answerId)
    {
        var factory = new ConnectionFactory
        {
            HostName = _settings.HostName,
            UserName = _settings.UserName,
            Password = _settings.Password
        };

        await using var connection = await factory.CreateConnectionAsync();
        await using var channel = await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(
            queue: _settings.EvaluationQueueName,
            durable: true,
            exclusive: false,
            autoDelete: false);

        var message = new EvaluationRequestedEvent
        {
            AnswerId = answerId
        };

        var body = Encoding.UTF8.GetBytes(
            JsonSerializer.Serialize(message));

        await channel.BasicPublishAsync(
            exchange: "",
            routingKey: _settings.EvaluationQueueName,
            body: body);
    }
    public async Task PublishResumeUploadedAsync(Guid resumeId)
    {
        var factory = new ConnectionFactory
        {
            HostName = _settings.HostName,
            UserName = _settings.UserName,
            Password = _settings.Password
        };

        await using var connection =
            await factory.CreateConnectionAsync();

        await using var channel =
            await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(
            queue: _settings.ResumeQueueName,
            durable: true,
            exclusive: false,
            autoDelete: false);

        var message = new ResumeUploadedEvent
        {
            ResumeId = resumeId
        };

        var body = Encoding.UTF8.GetBytes(
            JsonSerializer.Serialize(message));

        await channel.BasicPublishAsync(
            exchange: "",
            routingKey: _settings.ResumeQueueName,
            body: body);
    }
}