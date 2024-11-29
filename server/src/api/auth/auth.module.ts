import { Module } from '@nestjs/common'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './service/auth.service'
import { AccountModule } from '../account/account.module'
import { AccountService } from '../account/service/account.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { RoleEntity } from 'src/database/entities/role.entity'
import { GoogleStrategy } from './google.strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
    imports: [
        AccountModule,
        TypeOrmModule.forFeature([AccountEntity, RoleEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService, AccountService, GoogleStrategy],
    exports: []
})
export class AuthModule {}
