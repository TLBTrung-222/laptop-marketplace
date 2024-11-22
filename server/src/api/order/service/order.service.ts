import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { OrderEntity } from 'src/database/entities/order.entity'
import { Repository } from 'typeorm'
import { CreateOrderDto } from '../dto/order.dto'
import { ProductEntity } from 'src/database/entities/product.entity'
import { OrderToProductEntity } from 'src/database/entities/order-to-product.entity'
import { OrderStatus } from 'src/shared/enum/order.enum'
import { ShippingService } from 'src/api/shipping/service/shipping.service'
import { PaymentService } from 'src/api/payment/service/payment.service'
import { PaymentMethod } from 'src/shared/enum/payment.enum'
import { CreateVNPAYPaymentDto } from 'src/api/payment/dto/payment.dto'
import { PaymentEntity } from 'src/database/entities/payment.entity'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderToProductEntity)
        private orderToProductRepository: Repository<OrderToProductEntity>,
        private shippingService: ShippingService,
        private paymentService: PaymentService
    ) {}

    async getOrder(buyer: AccountEntity, orderId: string) {
        let existOrder: OrderEntity
        try {
            existOrder = await this.orderRepository
                .createQueryBuilder('orders')
                .select()
                .where('orders.id = :orderId', { orderId })
                .andWhere('orders.buyerId = :buyerId', { buyerId: buyer.id })
                .getOneOrFail()
        } catch (e) {
            throw new NotFoundException('Order not found')
        }
        return existOrder
    }

    async getOrderItems(buyer: AccountEntity, orderId: string) {
        const existOrderItems = await this.orderRepository
            .createQueryBuilder('orders')
            .leftJoinAndSelect('orders.orderToProducts', 'orderItems')
            .where('orders.id = :orderId', { orderId })
            .andWhere('orders.buyerId = :buyerId', { buyerId: buyer.id })
            .getMany()

        return existOrderItems
    }

    async getOrders(buyer: AccountEntity) {
        return this.orderRepository
            .createQueryBuilder('orders')
            .select()
            .where('orders.buyerId = :buyerId', { buyerId: buyer.id })
            .getMany()
    }

    // create order, shipping, payment
    async createOrder(
        buyer: AccountEntity,
        createOrderDto: CreateOrderDto,
        createVNPAYPaymentDto?: CreateVNPAYPaymentDto
    ) {
        // calculate total price
        let totalAmount = 0
        for (const orderItem of createOrderDto.orderItems) {
            const product = await this.productRepository.findOneBy({
                id: orderItem.productId
            })

            if (!product)
                throw new NotFoundException(
                    `Can not find product with id: ${orderItem.productId}`
                )

            totalAmount += orderItem.quantity * product.price
        }

        /* -------------------------------------------------------------------------- */
        /*                               create the order                             */
        /* -------------------------------------------------------------------------- */
        const newOrder = this.orderRepository.create({
            totalAmount,
            buyer
        })
        const savedOrder = await this.orderRepository.save(newOrder)

        /* -------------------------------------------------------------------------- */
        /*                             save all order item                            */
        /* -------------------------------------------------------------------------- */
        const newOrderItems = createOrderDto.orderItems.map((value) => {
            return { orderId: savedOrder.id, ...value }
        })
        await this.orderToProductRepository.save(newOrderItems)

        /* -------------------------------------------------------------------------- */
        /*                               create shipping                              */
        /* -------------------------------------------------------------------------- */
        await this.shippingService.createShipping(
            savedOrder,
            createOrderDto.shippingInfors
        )

        /* -------------------------------------------------------------------------- */
        /*                               create payment                               */
        /* -------------------------------------------------------------------------- */
        // if COD -> return payment entity after saving to db
        // if VNPAY -> return payment url to user to self-complete -> wait for FE to send infor to save this payment
        let payment: PaymentEntity | string
        if (createOrderDto.paymentMethod === PaymentMethod.VNPAY) {
            if (!createVNPAYPaymentDto.orderId)
                throw new BadRequestException(
                    'Need to provide vnpay information for this payment method'
                )

            payment = await this.paymentService.createPaymentUrl(
                createVNPAYPaymentDto
            )

            return { savedOrder, payment }
        } else {
            payment = await this.paymentService.createPaymentCod(
                savedOrder,
                totalAmount
            )
            return { savedOrder }
        }
    }

    async updateOrderStatus(orderId: number, newStatus: OrderStatus) {
        return this.orderRepository
            .createQueryBuilder()
            .update(OrderEntity)
            .set({ orderStatus: newStatus })
            .where('id = :orderId', { orderId })
            .execute()
    }

    async deleteOrder(orderId: number) {
        return this.orderRepository
            .createQueryBuilder()
            .delete()
            .from(OrderEntity)
            .where('id = :orderId', { orderId })
            .execute()
    }
}
