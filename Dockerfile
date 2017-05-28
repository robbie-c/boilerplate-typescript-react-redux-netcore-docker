FROM microsoft/aspnetcore-build:1.1
WORKDIR /app
COPY . /app
RUN dotnet restore
ENV ASPNETCORE_URLS http://*:5000
EXPOSE 5000
ENTRYPOINT dotnet run
