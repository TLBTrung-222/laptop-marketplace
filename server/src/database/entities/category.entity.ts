// define brand entity here

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    // Định nghĩa mối quan hệ OneToMany với ProductEntity
    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
}
