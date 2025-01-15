import { ShippingStatus } from '../../shared/enum/shipping.enum'
import {
    Column,
    CreateDateColumn,
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

    @CreateDateColumn()
    shippingDate: Date

    @Column({ type: Date, nullable: true })
    deliveryDate: Date

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @OneToOne(() => OrderEntity, (order) => order.shipping, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'orderId' })
    order: OrderEntity
}
