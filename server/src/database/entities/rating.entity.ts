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
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => ProductEntity, (product) => product.ratings)
    @JoinColumn({ name: 'productId' })
    product: ProductEntity

    @ManyToOne(() => AccountEntity, (account) => account.id)
    @JoinColumn({ name: 'buyerId' })
    buyer: AccountEntity

    @Column()
    ratingStar: number

    @Column()
    comment: string
}
