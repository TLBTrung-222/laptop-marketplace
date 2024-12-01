import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'

// Load environment variables from the .env.dev file
dotenv.config({ path: '.env.dev' })

// for TypeOrm CLI
export const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts']
} as DataSourceOptions)
