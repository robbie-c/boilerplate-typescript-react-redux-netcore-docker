FROM microsoft/aspnetcore-build:1.1 as build
WORKDIR /app
COPY . /app
ENV ASPNETCORE_ENVIRONMENT=Production
RUN dotnet restore
RUN dotnet publish --configuration Release

FROM microsoft/aspnetcore-build:1.1 as release
WORKDIR /app
COPY --from=build /app/bin/Release/netcoreapp1.1/publish /app
ENV ASPNETCORE_URLS http://*:5000
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 5000
CMD /bin/bash -c "dotnet boilerplate-typescript-react-redux-netcore-docker.dll"
