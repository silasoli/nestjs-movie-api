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

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Database Commands

```bash
# run migrations
$ npx typeorm migration:run -d dist/database/database.providers.js

# create migration file
$ npx typeorm migration:create src\database\migrations\${name of migration}
```

## Support

To facilitate the consumption of the API, the Swagger UI library was used, the documentation is located in the "/api" route.
More information: [Silasoli](https://www.linkedin.com/in/silasoli/)



## Contacts

- Linkedin - [Silasoli](https://www.linkedin.com/in/silasoli/)
- Website - [Silasoli](https://silasoli.github.io/)

