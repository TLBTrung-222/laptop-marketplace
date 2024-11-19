import { Module } from '@nestjs/common'
import { OrderController } from './controller/order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from 'src/database/entities/order.entity'
import { ProductEntity } from 'src/database/entities/product.entity'
import { OrderService } from './service/order.service'
import { OrderToProductEntity } from 'src/database/entities/order-to-product.entity'
import { PaymentModule } from '../payment/payment.module'
import { PaymentService } from '../payment/service/payment.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            ProductEntity,
            OrderToProductEntity
        ]),
        PaymentModule
    ],
    controllers: [OrderController],
    providers: [OrderService, PaymentService]
})
export class OrderModule {}
