import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { CartEntity } from './cart.entity'
import { ProductEntity } from './product.entity'

@Entity('cart_item')
export class CartToProductEntity {
    @PrimaryColumn()
    @ManyToOne(() => CartEntity, (cart) => cart.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cartId' })
    cartId: number

    @PrimaryColumn()
    @ManyToOne(() => ProductEntity, (product) => product.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'productId' })
    productId: number

    @Column()
    quantity: number
}
