import { Module } from '@nestjs/common'
import { ProductController } from './controller/product.controller'
import { ProductEntity } from 'src/database/entities/product.entity'
import { RatingEntity } from 'src/database/entities/rating.entity'
import { BrandEntity } from 'src/database/entities/brand.entity'
import { CategoryEntity } from 'src/database/entities/category.entity'
import { AccountEntity } from 'src/database/entities/account.entity'
import { ProductService } from './service/product.service'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductEntity,
            RatingEntity,
            BrandEntity,
            CategoryEntity,
            AccountEntity
        ])
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: []
})
export class ProductModule {}
