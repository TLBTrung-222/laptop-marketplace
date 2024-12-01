import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity('images')
export class ImageEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    image: string

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @ManyToOne(() => ProductEntity, (product) => product.images, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'productId' })
    product: ProductEntity
}
