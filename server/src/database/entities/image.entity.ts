import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity()
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    image: Buffer

    @ManyToOne(() => ProductEntity, (product) => product.images)
    @JoinColumn({ name: 'productId' })
    product: ProductEntity
}
