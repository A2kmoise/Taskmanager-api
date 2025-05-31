Task Manager API

A simple Task Manager API built with NestJS, TypeORM, PostgreSQL, and Swagger for API documentation.
Setup

    Clone the repository and install dependencies:

$ git clone https://github.com/A2kmoise/task-manager-api.git
$ cd task-manager-api
$ yarn install

Development Commands

    Run in development mode:

$ yarn run start:dev

    Run in production mode:

$ yarn run start:prod

    Run the application normally:

$ yarn run start

Testing

    Run unit tests:

$ yarn run test

    Run e2e tests:

$ yarn run test:e2e

    Check test coverage:

$ yarn run test:cov

API Documentation

    Swagger UI is available at:

http://localhost:5467/api

Docker Setup

To run the app and PostgreSQL in Docker:

$ docker-compose up --build

Access the app at http://localhost:5467.
