import { PaymentStatus } from 'src/shared/enum/payment.enum'
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

    @Column({ type: Date })
    paymentDate: Date

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @OneToOne(() => OrderEntity, (order) => order.payment)
    @JoinColumn({ name: 'orderId' })
    order: OrderEntity
}
