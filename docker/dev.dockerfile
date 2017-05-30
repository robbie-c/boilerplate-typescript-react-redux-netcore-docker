FROM microsoft/aspnetcore-build:1.1
WORKDIR /app
COPY . /app
ENV ASPNETCORE_URLS http://*:5000
ENV ASPNETCORE_ENVIRONMENT=Development
EXPOSE 5000
CMD dotnet restore && dotnet publish --configuration Debug && dotnet run