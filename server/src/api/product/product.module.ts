import { Module } from '@nestjs/common'
import { ProductController } from './controller/product.controller'
import { ProductEntity } from 'src/database/entities/product.entity'
import { RatingEntity } from 'src/database/entities/rating.entity'
import { BrandEntity } from 'src/database/entities/brand.entity'
import { CategoryEntity } from 'src/database/entities/category.entity'
import { AccountEntity } from 'src/database/entities/account.entity'
import { ProductService } from './service/product.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RatingModule } from '../rating/rating.module'
import { SpecificationService } from '../specification/service/specification.service'
import { SpecificationEntity } from 'src/database/entities/specification.entity'
import { ImageEntity } from 'src/database/entities/image.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            RatingEntity,
            BrandEntity,
            CategoryEntity,
            AccountEntity,
            ProductEntity,
            SpecificationEntity,
            ImageEntity
        ]),
        RatingModule
    ],
    controllers: [ProductController],
    providers: [ProductService, SpecificationService],
    exports: []
})
export class ProductModule {}
