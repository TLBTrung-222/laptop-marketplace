import { Module } from '@nestjs/common'
import { OrderController } from './controller/order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from 'src/database/entities/order.entity'
import { ProductEntity } from 'src/database/entities/product.entity'
import { OrderService } from './service/order.service'
import { OrderToProductEntity } from 'src/database/entities/order-to-product.entity'
import { PaymentModule } from '../payment/payment.module'
import { PaymentService } from '../payment/service/payment.service'
import { ShippingModule } from '../shipping/shipping.module'
import { ShippingService } from '../shipping/service/shipping.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            ProductEntity,
            OrderToProductEntity
        ]),
        PaymentModule,
        ShippingModule
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
