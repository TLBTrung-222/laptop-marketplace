# revert the latest change

npm run typeorm migration:revert<p align="center">
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

2. Serialization:
   To convert entities (`TypeORM`) to exclude sensitive infor, we use `Serialize(View<...>DTO)` for every controller

3. Decorator:
   Decorator can get the property type, read more [here](https://stackoverflow.com/questions/38314908/how-to-get-type-data-in-typescript-decorator)

4. Best way to update entity:
   Get the entity by id, if not found throw error, else assign new update data to that entity instance, then re-save (TypeORM will update if this entity is already on database)

5. When seller submit new product, BE auto submit a new approval, state 'pending'

6. Login with google in this project ultimately retrieve a session as cookie + register user to db.

## Notes

1. Image processing: Save avatar and product demo inside `/src/assets` folder, to retrieve avatar image, call `http://localhost:3001/api/accounts/avatar` api to get the Buffer which represent the avatar (FE will render this buffer). For user with no avatar (avatar field is null), FE need to display the default avatar located at `http://localhost:3001/public/default_user.jpg` (already be served as static file). For product image, they have already been served as static file (format as `{productId-hash}`), call to `http://localhost:3001/products/public/{productId-hash}.jpg` to retrieve the image

2. Important command with psql:

```py
# login to our db
psql -U postgres -d laptop-marketplace

# list all db
\l

# list all relations
\d

# get help with psql command
\?
```

3. Sign in/up with OAuth only support for buyer account

4. To change relations schema in production, we need to use migration. [TypeORM is able to automatically generate migration files with schema changes you made.](https://typeorm.io/migrations#generating-migrations)

```py
# generate new migration
npm run typeorm migration:generate ./src/database/migrations/<MigrationName>

# or if you want to do it manually, typeorm can create
# a template for you to fill in sql commands
npm run typeorm migration:create ./src/database/migrations/UpdateOrderCascade

# apply migration to database
npm run typeorm migration:run

# revert the latest change
npm run typeorm migration:revert
```

Note that before running these command, make sure you in package.json, you configured with this command (to specify the data source):

```json
"typeorm": "typeorm-ts-node-commonjs -d ./src/database/typeorm/data-source.ts"
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
