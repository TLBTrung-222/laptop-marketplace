import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { OrderEntity } from './order.entity'
import { ProductEntity } from './product.entity'

@Entity('order_item')
export class OrderToProductEntity {
    @PrimaryColumn()
    @ManyToOne(() => OrderEntity, (order) => order.orderToProducts, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'orderId' })
    orderId: number

    @PrimaryColumn()
    @ManyToOne(() => ProductEntity, (product) => product.orderToProducts, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'productId' })
    productId: number

    @Column()
    quantity: number
}
