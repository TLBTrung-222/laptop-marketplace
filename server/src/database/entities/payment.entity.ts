import { PaymentMethod, PaymentStatus } from '../../shared/enum/payment.enum'
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { OrderEntity } from './order.entity'

@Entity('payments')
export class PaymentEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    paymentAmount: number

    @Column({ enum: PaymentStatus, default: PaymentStatus.UNPAID })
    paymentStatus: PaymentStatus

    @Column({ enum: PaymentMethod, nullable: false })
    paymentMethod: PaymentMethod

    @Column({ type: Date, nullable: true })
    paymentDate: Date

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @OneToOne(() => OrderEntity, (order) => order.payment, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'orderId' })
    order: OrderEntity
}
