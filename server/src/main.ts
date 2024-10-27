import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import { TypeormStore } from 'connect-typeorm'
import { SessionEntity } from './database/entities/session.entity'
import { DataSource } from 'typeorm'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    // set up express-session
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

    // set up swagger
    const config = new DocumentBuilder()
        .setTitle('Laptop ecommerce website')
        .setDescription('The website REST API documentation')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, documentFactory)

    await app.listen(3001)
}
bootstrap()
