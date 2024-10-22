import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ApiModule } from './api/api.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './database/typeorm/typeorm.config'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        }),
        ApiModule
    ],
    controllers: [AppController]
})
export class AppModule {}
