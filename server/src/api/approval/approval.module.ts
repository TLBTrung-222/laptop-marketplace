import { Module } from '@nestjs/common'
import { ApprovalController } from './controller/approval.controller'
import { ApprovalService } from './service/approval.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApprovalEntity } from 'src/database/entities/approval.entity'
import { AccountEntity } from 'src/database/entities/account.entity'
import { ProductEntity } from 'src/database/entities/product.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([ApprovalEntity, AccountEntity, ProductEntity])
    ],
    controllers: [ApprovalController],
    providers: [ApprovalService],
    exports: [ApprovalService]
})
export class ApprovalModule {}
