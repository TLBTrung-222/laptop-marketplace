import { Module } from '@nestjs/common'
import { PaymentService } from './service/payment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from 'src/database/entities/order.entity'
import { PaymentEntity } from 'src/database/entities/payment.entity'

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, PaymentEntity])],
    exports: [PaymentService],
    providers: [PaymentService]
})
export class PaymentModule {}
