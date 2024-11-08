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

3. Decorator:
   Decorator can get the property type, read more [here](https://stackoverflow.com/questions/38314908/how-to-get-type-data-in-typescript-decorator)

4. Best way to update entity:
   Get the entity by id, if not found throw error, else assign new update data to that entity instance, then re-save (TypeORM will update if this entity is already on database)

5. When seller submit new product, BE auto submit a new approval, state 'pending'

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
