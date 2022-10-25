<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">Movie catalog API built with NestJs and Postgres</p>
  
## Description

Movie catalog API that counts with CRUD of users, movies and two authentication routes.

## Installation

```bash
$ npm install
```
## Before running the app
```bash
# 1. Make sure the database is created;
# 2. Fill in all environment variables;
# 3. Run all migrations;
# 4. Run the app;
# 5. Use the default user to manipulate the app.
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Database Commands

```bash
# run migrations
$ npx typeorm migration:run -d dist/database/database.providers.js

# create migration file
$ npx typeorm migration:create src\database\migrations\{name of migration}
```
## Support

To facilitate the consumption of the API, the Swagger UI library was used, the documentation is located in the "/api" route.
## Contacts

- Linkedin - [Silasoli](https://www.linkedin.com/in/silasoli/)
- Website - [Silasoli](https://silasoli.github.io/)

