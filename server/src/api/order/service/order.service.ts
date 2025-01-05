import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { OrderEntity } from 'src/database/entities/order.entity'
import { DataSource, Repository } from 'typeorm'
import { CreateOrderDto } from '../dto/order.dto'
import { ProductEntity } from 'src/database/entities/product.entity'
import { OrderToProductEntity } from 'src/database/entities/order-to-product.entity'
import { OrderStatus } from 'src/shared/enum/order.enum'
import { ShippingService } from 'src/api/shipping/service/shipping.service'
import { PaymentService } from 'src/api/payment/service/payment.service'
import { PaymentMethod } from 'src/shared/enum/payment.enum'
import { ShippingEntity } from 'src/database/entities/shipping.entity'
import { PaymentEntity } from 'src/database/entities/payment.entity'
import { FundTransactionEntity } from 'src/database/entities/fund-transaction.entity'
import { FundEntity } from 'src/database/entities/fund.entity'
import { FundTransactionStatus } from 'src/shared/enum/fund-transaction.enum'
import { EmailService } from 'src/api/email/service/email.service'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
        private paymentService: PaymentService,
        private emailService: EmailService,
        private dataSource: DataSource
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

    async getOrdersAdmin() {
        return this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.payment', 'payment')
            .leftJoinAndSelect('order.shipping', 'shipping')
            .leftJoinAndSelect('order.buyer', 'buyer')
            .getMany()
    }

    async getOrders(buyer: AccountEntity) {
        return this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.payment', 'payment')
            .leftJoinAndSelect('order.shipping', 'shipping')
            .where('order.buyerId = :buyerId', { buyerId: buyer.id })
            .getMany()
    }

    // create order, shipping, payment
    async createOrder(
        buyer: AccountEntity,
        createOrderDto: CreateOrderDto,
        ipAddress: string
    ) {
        const savedOrder = await this.dataSource.transaction(
            async (entityManager) => {
                // calculate total price, create fund transaction
                let fundTransactions: FundTransactionEntity[] = []
                let totalAmount = 0
                for (const orderItem of createOrderDto.orderItems) {
                    // get product
                    const product = await entityManager.findOne(ProductEntity, {
                        where: { id: orderItem.productId },
                        relations: { seller: true }
                    })

                    if (!product)
                        throw new NotFoundException(
                            `Can not find product with id: ${orderItem.productId}`
                        )

                    if (orderItem.quantity >= product.stockQuantity)
                        throw new BadRequestException(
                            `Not enough stock quantity for product id: ${orderItem.productId}`
                        )

                    // subtract remain stock quantity
                    product.stockQuantity -= orderItem.quantity
                    await entityManager.save(product)

                    // create fund transaction for each order item
                    const sellerFund = await entityManager.findOne(FundEntity, {
                        where: { seller: { id: product.seller.id } }
                    })

                    const newFundTransaction = entityManager.create(
                        FundTransactionEntity,
                        {
                            fund: sellerFund,
                            creditAmount: orderItem.quantity * product.price,
                            creditStatus: FundTransactionStatus.UNPAID
                        }
                    )
                    fundTransactions.push(newFundTransaction)

                    totalAmount += orderItem.quantity * product.price
                }

                /* -------------------------------------------------------------------------- */
                /*                               create the order                             */
                /* -------------------------------------------------------------------------- */
                const newOrder = entityManager.create(OrderEntity, {
                    totalAmount,
                    buyer
                })
                const savedOrder = await entityManager.save(
                    OrderEntity,
                    newOrder
                )

                /* -------------------------------------------------------------------------- */
                /*                             save all order item                            */
                /* -------------------------------------------------------------------------- */
                const newOrderItems = createOrderDto.orderItems.map((value) => {
                    return { orderId: savedOrder.id, ...value }
                })
                await entityManager.save(OrderToProductEntity, newOrderItems)

                /* -------------------------------------------------------------------------- */
                /*                           create fund transaction                          */
                /* -------------------------------------------------------------------------- */
                const newFundTransactions = fundTransactions.map((value) => {
                    return { order: savedOrder, ...value }
                })
                await entityManager.save(
                    FundTransactionEntity,
                    newFundTransactions
                )

                /* -------------------------------------------------------------------------- */
                /*                               create shipping                              */
                /* -------------------------------------------------------------------------- */
                const newShipping = entityManager.create(ShippingEntity, {
                    order: savedOrder,
                    ...createOrderDto.shippingInfors
                })
                await entityManager.save(ShippingEntity, newShipping)

                /* -------------------------------------------------------------------------- */
                /*                               create payment                               */
                /* -------------------------------------------------------------------------- */
                // if VNPAY -> return payment url to user to self-complete -> wait for FE to send infor to save this payment

                const newPayment = entityManager.create(PaymentEntity, {
                    order: savedOrder,
                    paymentAmount: totalAmount,
                    paymentMethod: createOrderDto.paymentMethod
                })
                await entityManager.save(newPayment)
                return savedOrder
            }
        )

        // Generate payment URL after transaction
        if (createOrderDto.paymentMethod === PaymentMethod.VNPAY) {
            const paymentUrl = await this.paymentService.generatePaymentUrl({
                order: savedOrder,
                ipAddress,
                bankCode: createOrderDto.bankCode
            })

            return { savedOrder, paymentUrl }
        }

        // send email to user
        this.emailService.sendOrderCreatedEmail(buyer.email, savedOrder)

        return { savedOrder }
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
