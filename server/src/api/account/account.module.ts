import { Module } from '@nestjs/common'
import { AccountController } from './controller/account.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { AccountService } from './service/account.service'

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    controllers: [AccountController],
    providers: [AccountService],
    exports: [AccountService]
})
export class AccountModule {}
