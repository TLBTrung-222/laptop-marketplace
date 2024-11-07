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
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => ProductEntity, (product) => product.specificationId) // Sửa đổi để tham chiếu tới quan hệ trong ProductEntity
    @JoinColumn({ name: 'productId' })
    product: ProductEntity

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

    @Column()
    weight: number

    @Column()
    color: string

    @Column()
    dimensions: string
}
