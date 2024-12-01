import { Module } from '@nestjs/common'
import { PaymentService } from './service/payment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaymentEntity } from 'src/database/entities/payment.entity'
import { FundTransactionEntity } from 'src/database/entities/fund-transaction.entity'
import { FundEntity } from 'src/database/entities/fund.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PaymentEntity,
            FundTransactionEntity,
            FundEntity
        ])
    ],
    exports: [PaymentService],
    providers: [PaymentService]
})
export class PaymentModule {}
