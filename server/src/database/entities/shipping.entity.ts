import { ShippingStatus } from 'src/shared/enum/shipping.enum'
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { OrderEntity } from './order.entity'

@Entity('shippings')
export class ShippingEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        enum: ShippingStatus,
        default: ShippingStatus.WAITING_TO_BE_PACKED
    })
    shippingStatus: ShippingStatus

    @Column()
    city: string

    @Column()
    district: string

    @Column()
    street: string

    @Column({ type: Date, default: null })
    shippingDate: Date

    @Column({ type: Date, default: null })
    deliveryDate: Date

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @OneToOne(() => OrderEntity, (order) => order.shipping)
    @JoinColumn({ name: 'orderId' })
    order: OrderEntity
}
