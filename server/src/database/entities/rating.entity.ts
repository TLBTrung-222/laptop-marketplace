// define brand entity here

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ProductEntity } from './product.entity'
import { AccountEntity } from './account.entity'

@Entity('ratings')
export class RatingEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ratingStar: number

    @Column()
    comment: string

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */

    @ManyToOne(() => ProductEntity, (product) => product.ratings, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'productId' })
    product: ProductEntity

    @ManyToOne(() => AccountEntity, (account) => account.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'buyerId' })
    buyer: AccountEntity
}
