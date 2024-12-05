import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ApiModule } from './api/api.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './database/typeorm/typeorm.config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { SuccessResponseInterceptor } from './shared/interceptor/success-response.interceptor'
import { ErrorResponse } from './shared/exception/error-response.exception'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        }),
        ApiModule,
        ConfigModule.forRoot({ envFilePath: '.env.dev', isGlobal: true }),
        ServeStaticModule.forRoot(
            {
                rootPath: join(__dirname, 'assets', 'public'),
                serveRoot: '/public'
            },
            {
                rootPath: join(__dirname, 'assets', 'products'),
                serveRoot: '/products/public'
            }
        )
    ],
    controllers: [AppController],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: SuccessResponseInterceptor },
        { provide: APP_FILTER, useClass: ErrorResponse }
    ]
})
export class AppModule {
    constructor() {
        console.log('App module here, where am i...')
        console.log(__dirname)
    }
}
