import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { AccountEntity } from '../entities/account.entity'
import { RoleEntity } from '../entities/role.entity'
import { SessionEntity } from '../entities/session.entity'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'sqlite',
            database: 'dev.sqlite',
            entities: [AccountEntity, RoleEntity, SessionEntity],
            synchronize: true,
            migrationsRun: false
        }
    }
}
