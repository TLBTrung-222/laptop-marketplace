import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { AccountEntity } from './account.entity'
import { OrderToProductEntity } from './order-to-product.entity'
import { OrderStatus } from '../../shared/enum/order.enum'
import { PaymentEntity } from './payment.entity'
import { ShippingEntity } from './shipping.entity'
import { FundTransactionEntity } from './fund-transaction.entity'

@Entity('orders')
export class OrderEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    totalAmount: number

    @Column({ enum: OrderStatus, default: OrderStatus.PENDING })
    orderStatus: OrderStatus

    @CreateDateColumn()
    orderDate: Date

    @Column({ default: null })
    completionDate: Date

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @ManyToOne(() => AccountEntity, (account) => account.orders, {
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'buyerId' })
    buyer: AccountEntity

    @OneToMany(
        () => OrderToProductEntity,
        (orderToProduct) => orderToProduct.orderId
    )
    orderToProducts: OrderToProductEntity[]

    @OneToOne(() => PaymentEntity, (payment) => payment.order)
    payment: PaymentEntity

    @OneToOne(() => ShippingEntity, (shipping) => shipping.order)
    shipping: ShippingEntity

    @OneToMany(
        () => FundTransactionEntity,
        (fundTransaction) => fundTransaction.order
    )
    fundTransactions: FundTransactionEntity[]
}
