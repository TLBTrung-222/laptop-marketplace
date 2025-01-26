import { Module } from '@nestjs/common'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './service/auth.service'
import { AccountModule } from '../account/account.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { RoleEntity } from 'src/database/entities/role.entity'
import { GoogleStrategy } from './strategy/google.strategy'
import { PassportModule } from '@nestjs/passport'
import { FundEntity } from 'src/database/entities/fund.entity'
import { EmailModule } from '../email/email.module'

@Module({
    imports: [
        AccountModule,
        EmailModule,
        TypeOrmModule.forFeature([AccountEntity, RoleEntity, FundEntity]),
        PassportModule.register({ property: 'account' })
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy],
    exports: []
})
export class AuthModule {}
