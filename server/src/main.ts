import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
import { TypeormStore } from 'connect-typeorm'
import { SessionEntity } from './database/entities/session.entity'
import { DataSource } from 'typeorm'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.setGlobalPrefix('api')
    const configService = app.get<ConfigService>(ConfigService)

    /* -------------------------------------------------------------------------- */
    /*                                 Enable CORS                                */
    /* -------------------------------------------------------------------------- */
    app.enableCors({
        origin: configService.get('FRONT_END_URL', 'http://localhost:3000'), // using default value if FRONT_END_URL not founded
        credentials: true
    })

    /* -------------------------------------------------------------------------- */
    /*                           Set up express-session                           */
    /* -------------------------------------------------------------------------- */
    const sessionRepository = app.get(DataSource).getRepository(SessionEntity)
    app.use(
        session({
            secret: configService.get('SECRET_KEY'),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true, // Prevent access via JavaScript
                sameSite: 'none' // Required for cross-origin cookies
            },
            store: new TypeormStore({
                cleanupLimit: 2
            }).connect(sessionRepository)
        })
    )

    /* -------------------------------------------------------------------------- */
    /*                               Set up swagger                               */
    /* -------------------------------------------------------------------------- */
    const config = new DocumentBuilder()
        .setTitle('Laptop ecommerce website')
        .setDescription('The website REST API documentation')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, documentFactory)

    await app.listen(parseInt(configService.get('PORT', '3001')))
}
bootstrap()
