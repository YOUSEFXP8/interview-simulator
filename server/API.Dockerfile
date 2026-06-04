FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["API/Interview_API/Interview_API.csproj", "API/Interview_API/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
RUN dotnet restore "API/Interview_API/Interview_API.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/API/Interview_API"
RUN dotnet build "Interview_API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Interview_API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Interview_API.dll"]
