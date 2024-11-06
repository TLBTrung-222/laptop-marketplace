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
    @JoinColumn()
    productId: ProductEntity

    @Column()
    cpu: string;

    @Column()
    ram: number

    @Column()
    storage: number

    @Column()
    gpu: string

    @Column()
    display: string

    @Column()
    port: string

    @Column()
    keyboard: string

    @Column()
    lan: boolean

    @Column()
    wifi: boolean

    @Column()
    bluetooth: boolean

    @Column()
    webcam: boolean

    @Column()
    os: string

    @Column()
    battery: number

    @Column()
    weight: number

    @Column()
    color: string

    @Column()
    dimensions: string
}
