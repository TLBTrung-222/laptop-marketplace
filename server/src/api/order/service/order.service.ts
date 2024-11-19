import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { OrderEntity } from 'src/database/entities/order.entity'
import { Repository } from 'typeorm'
import { CreateOrderDto } from '../dto/order.dto'
import { ProductEntity } from 'src/database/entities/product.entity'
import { OrderToProductEntity } from 'src/database/entities/order-to-product.entity'
import { OrderStatus } from 'src/shared/enum/order.enum'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectRepository(OrderToProductEntity)
        private orderToProductRepository: Repository<OrderToProductEntity>
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

    async createOrder(buyer: AccountEntity, body: CreateOrderDto) {
        // calculate total price
        let totalAmount = 0
        for (const orderItem of body.orderItems) {
            const product = await this.productRepository.findOneBy({
                id: orderItem.productId
            })

            if (!product)
                throw new NotFoundException(
                    `Can not find product with id: ${orderItem.productId}`
                )

            totalAmount += orderItem.quantity * product.price
        }
        // save the order
        const newOrder = await this.orderRepository
            .createQueryBuilder()
            .insert()
            .into(OrderEntity)
            .values([{ totalAmount, buyer }])
            .execute()

        // save all order item
        const newOrderItems = body.orderItems.map((value) => {
            return { orderId: newOrder.identifiers[0].id, ...value }
        })
        await this.orderToProductRepository
            .createQueryBuilder()
            .insert()
            .into(OrderToProductEntity)
            .values(newOrderItems)
            .execute()

        // return savedOrder
        return newOrder.generatedMaps[0]
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
