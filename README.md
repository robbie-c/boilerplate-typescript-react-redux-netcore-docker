# A boilerplate with TypeScript + React + Redux + redux-saga on the front, .NET Core on the back, all in a Docker container

## Overview

I started off using
`dotnet new --install Microsoft.AspNetCore.SpaTemplates::*`
which let me generate a TypeScript React/Redux project with
`dotnet new reactredux`
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
Production:
`docker build -f docker/prod.dockerfile -t prodimage .`
`docker run -p 5000:5000 prodimage`
Go to `locahost:5000`

Development
`docker build -f docker/dev.dockerfile -t devimage .`
`docker run -p 5000:5000 -v $PWD:/app dhdev`
Go to `locahost:5000`
This will mount your working directory inside the container, so any changes you make locally will be represented in the app.