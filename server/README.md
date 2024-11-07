<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Rules

1. Response format:

```typescript
{
  isSuccess: boolean,
  data: any,
  errors: string | string[]
}
```

## Project setup

```bash
$ npm install
```

2. Serialization:
   To convert entities (`TypeORM`) to exclude sensitive infor, we use `Serialize(View<...>DTO)` for every controller

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
