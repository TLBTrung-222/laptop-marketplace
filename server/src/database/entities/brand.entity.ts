// define brand entity here

import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity('brands')
export class BrandEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => ProductEntity, (product) => product.brand)
    products: ProductEntity[]
}
