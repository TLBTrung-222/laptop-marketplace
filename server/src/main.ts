import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import { TypeormStore } from 'connect-typeorm'
import { SessionEntity } from './database/entities/session.entity'
import { DataSource } from 'typeorm'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    const sessionRepository = app.get(DataSource).getRepository(SessionEntity)
    app.use(
        session({
            secret: 'aRandomSecret',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
            store: new TypeormStore({
                cleanupLimit: 2
            }).connect(sessionRepository)
        })
    )
    app.setGlobalPrefix('api')

    await app.listen(3001)
}
bootstrap()
