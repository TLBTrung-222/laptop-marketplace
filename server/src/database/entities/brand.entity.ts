// define brand entity here

import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ProductEntity } from './product.entity';

@Entity('brands')
export class BrandEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @OneToOne(()=>ProductEntity, (product)=> product.brand)
    product: ProductEntity;
}
