// define brand entity here

import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ProductEntity } from './product.entity';

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(()=>ProductEntity, (product)=>product.category)
    category_id: ProductEntity;

    @Column()
    type: string;
}
