import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity('specifications')
export class SpecificationEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cpu: string

    @Column()
    ram: string

    @Column()
    storage: string

    @Column()
    gpu: string

    @Column()
    display: string

    @Column()
    port: string

    @Column()
    keyboard: string

    @Column()
    lan: string

    @Column()
    wifi: string

    @Column()
    bluetooth: string

    @Column()
    webcam: string

    @Column()
    os: string

    @Column()
    battery: string

    @Column({ type: 'float' })
    weight: number

    @Column()
    color: string

    @Column()
    dimensions: string

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @OneToOne(() => ProductEntity, (product) => product.specification, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'productId' })
    product: ProductEntity
}
