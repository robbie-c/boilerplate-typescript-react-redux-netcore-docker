# A boilerplate with TypeScript + React + Redux + redux-saga on the front, .NET Core on the back, all in a Docker container

## Overview

I started off using
```bash
dotnet new --install Microsoft.AspNetCore.SpaTemplates::*
```
which let me generate a TypeScript React/Redux project with
```bash
dotnet new reactredux
```
Unfortunately it uses `redux-thunk` and I didn't like how the code was structured, so I ported it over to `redux-sagas` and a better project layout.

Regarding server-side rendering, currently it does this but doesn't include any API calls. This is because I haven't added any auth code yet, which is one of the trickier things to get right with server-side rendering and API calls.

Currently API calls for page loading are handled by sagas that are triggered by actions dispatched on life cycle functions (e.g. `ComponentDidMount`)

## Links
 - https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/
 - Introduction to trying to do this without a project generator: https://medium.com/@MaartenSikkema/using-react-redux-and-webpack-with-dotnet-core-to-build-a-modern-web-frontend-7e2d091b3ba
 - Alternative approach https://github.com/rokoroku/react-redux-typescript-boilerplate
 - Understanding of how to do Actions with TypeScript: http://www.mattgreer.org/articles/typescript-react-and-redux/
 - React Event types https://facebook.github.io/react/docs/events.html and someone struggling with them https://stackoverflow.com/questions/42081549/typescript-react-event-types
 - dotnetcore with docker https://raygun.com/blog/net-core-docker-container/
 - more dotnetcore with docker https://www.microsoft.com/net/core#dockercmd

## TODO
 - Convert either TS types to C# or vice versa, so we can type check across API calls
 - Authentication
 - Database connection (probably PostgreSQL)
 - Server side api calls (needs auth first). Instead of loading data via React lifecycle functions I suspect this is best handled by somehow pairing components/routes to a saga, and running all relevant ones before return for server side rendering.

## Usage
###Production:
```bash
docker build -f docker/prod.dockerfile -t prodimage .
docker run -p 5000:5000 prodimage
```
Go to `locahost:5000`

###Development
To spin up images for the db, web server, and misc dev
```bash
# Foreground:
docker-compose up
# Background (the d stands for daemon):
docker-compose up -d
```

To run migrations on the db
```bash
docker-compose exec db psql -U docker -f /app/Migrations/2017-06-05-18\:35\:02-Up-InitialSetup.sql
```

Once this is running, you can go to `locahost:5000` and you can even update the front end code and watch it live update.

To execute a command inside a running container, do
```bash
docker-compose exec NAME CMD
# e.g. to get bash inside the dev image
docker-compose exec dev bash
```

To do back end development, i.e. be able to change C# files and rapidly restart the server, you will need to stop `web` container and get bash in the `dev` container.
```bash
docker-compose stop web
docker-compose exec dev bash
```

Then once in that container, you can use the `dotnet` command as usual, e.g.
```bash
dotnet restore
dotnet publish
dotnet run
```
Go to `locahost:5001` rather than port 5000 for the result of what is served inside the `dev` image.
