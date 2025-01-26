import { Global, Module } from '@nestjs/common'
import { AccountController } from './controller/account.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { AccountService } from './service/account.service'
import { RoleEntity } from 'src/database/entities/role.entity'
import { FundEntity } from 'src/database/entities/fund.entity'
import { S3Module } from '../s3/s3.module'

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity, RoleEntity, FundEntity]),
        S3Module
    ],
    controllers: [AccountController],
    providers: [AccountService],
    exports: [AccountService]
})
export class AccountModule {}
