import { Module } from '@nestjs/common'
import { OrderController } from './controller/order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from 'src/database/entities/order.entity'
import { ProductEntity } from 'src/database/entities/product.entity'
import { OrderService } from './service/order.service'
import { OrderToProductEntity } from 'src/database/entities/order-to-product.entity'
import { PaymentModule } from '../payment/payment.module'
import { ShippingModule } from '../shipping/shipping.module'
import { PaymentEntity } from 'src/database/entities/payment.entity'
import { EmailModule } from '../email/email.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            ProductEntity,
            OrderToProductEntity,
            PaymentEntity
        ]),
        PaymentModule,
        ShippingModule,
        EmailModule
    ],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrderModule {}
