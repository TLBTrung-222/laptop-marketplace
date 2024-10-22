import { Module } from '@nestjs/common'
import { AccountController } from './controller/account.controller'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './service/auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/database/entities/user.entity'
import { AccountService } from './service/account.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [AccountController, AuthController],
    providers: [AuthService, AccountService]
})
export class AccountModule {}
