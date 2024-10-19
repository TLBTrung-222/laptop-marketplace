import { Module } from '@nestjs/common'
import { AccountController } from './controller/account.controller'
import { AuthController } from './controller/auth.controller'

@Module({
    controllers: [AccountController, AuthController]
})
export class AccountModule {}
