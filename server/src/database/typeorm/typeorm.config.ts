import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { ConfigService } from '@nestjs/config'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get('POSTGRES_HOST'),
            port: this.configService.get('POSTGRES_PORT'),
            username: this.configService.get('POSTGRES_USERNAME'),
            password: this.configService.get('POSTGRES_PASSWORD'),
            database: this.configService.get('POSTGRES_DATABASE'),
            entities: ['dist/**/*.entity.js'],
            migrations: ['dist/database/migrations/*.js']
        }
    }
}
