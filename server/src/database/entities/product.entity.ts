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

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>AccountEntity, (account)=>account.id)
    @JoinColumn({name:'seller_id'})
    seller: AccountEntity;
    
    @OneToOne(()=>BrandEntity,(brand)=>brand.id)
    @JoinColumn({name:'brand_id'})
    brand: number;

    @OneToOne(()=>CategoryEntity, (category)=>category.category_id)
    @JoinColumn({name:'category_id'})
    category: CategoryEntity;

    @OneToMany(()=>RatingEntity, (rating)=>rating.product)
    rating_id: RatingEntity[];

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    stock_quantity: number;

    @Column()
    status: string;
    // new | old
}
