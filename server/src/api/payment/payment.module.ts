import { Module } from '@nestjs/common'
import { PaymentService } from './service/payment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from 'src/database/entities/order.entity'

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    exports: [PaymentService],
    providers: [PaymentService]
})
export class PaymentModule {}
