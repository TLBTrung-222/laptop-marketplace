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
import { RatingEntity } from './rating.entity'
import { BrandEntity } from './brand.entity'
import { CategoryEntity } from './category.entity'
import { AccountEntity } from './account.entity'
import { IsOptional } from 'class-validator'
import { SpecificationEntity } from './specification.entity'
import { ProductStatus } from 'src/shared/enum/product.enum'
import { ImageEntity } from './image.entity'

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => AccountEntity, (account) => account.id, {
        nullable: false
    })
    @JoinColumn({ name: 'sellerId' })
    seller: AccountEntity

    @ManyToOne(() => BrandEntity, (brand) => brand.products, {
        nullable: false
    })
    @JoinColumn({ name: 'brandId' })
    brand: BrandEntity

    @ManyToOne(() => CategoryEntity, (category) => category.products, {
        nullable: false
    })
    @JoinColumn({ name: 'categoryId' })
    category: CategoryEntity

    @OneToMany(() => RatingEntity, (rating) => rating.product, {
        cascade: ['remove']
    })
    ratings: RatingEntity[]

    @OneToOne(
        () => SpecificationEntity,
        (specification) => specification.product,
        {
            cascade: ['remove']
        }
    )
    specification: SpecificationEntity

    @OneToMany(() => ImageEntity, (image) => image.product, {
        cascade: ['remove']
    })
    images: ImageEntity[]

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    description: string

    @Column()
    stockQuantity: number

    @Column({
        type: 'varchar',
        default: ProductStatus.NEW
    })
    @IsOptional()
    status: ProductStatus
}
