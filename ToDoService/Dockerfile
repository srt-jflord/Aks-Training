#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
RUN apt-get update -yq \
    && apt-get install busybox -yq

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["ToDoService/ToDoService.csproj", "ToDoService/"]
RUN dotnet restore "ToDoService/ToDoService.csproj"
COPY . .
WORKDIR "/src/ToDoService"
RUN dotnet build "ToDoService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ToDoService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ToDoService.dll"]