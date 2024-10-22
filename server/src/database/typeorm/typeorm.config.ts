import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'sqlite',
            database: 'dev.sqlite',
            entities: [UserEntity],
            synchronize: true,
            migrationsRun: false
        }
    }
}
