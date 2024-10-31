// define brand entity here

import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { RatingEntity } from './rating.entity';
import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';
import { AccountEntity } from './account.entity';
import { IsOptional } from 'class-validator';

export enum ProductStatus {
    NEW = 'new',
    OLD = 'old'
}

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => AccountEntity, (account) => account.id)
    @JoinColumn({ name: 'seller_id' })
    seller: AccountEntity

    @ManyToOne(() => BrandEntity, (brand) => brand.products)
    @JoinColumn({ name: 'brand_id' })
    brand: BrandEntity

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity

    @OneToMany(() => RatingEntity, (rating) => rating.product)
    @JoinColumn({ name: 'rating_id' })
    ratings: RatingEntity[]

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    description: string

    @Column()
    stock_quantity: number

    @Column({
        type: 'varchar',
        default: ProductStatus.NEW
    })
    @IsOptional()
    status: ProductStatus
}
