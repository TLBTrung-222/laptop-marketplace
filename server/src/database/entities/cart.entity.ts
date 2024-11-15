import {
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { AccountEntity } from './account.entity'
import { CartToProductEntity } from './cart-to-product'

@Entity('carts')
export class CartEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    id: number

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @OneToOne(() => AccountEntity, (account) => account.cart, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'buyerId' })
    buyer: AccountEntity

    @OneToMany(
        () => CartToProductEntity,
        (cartToProduct) => cartToProduct.cartId
    )
    cartToProducts: CartToProductEntity[]
}
