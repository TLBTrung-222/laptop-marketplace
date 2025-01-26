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
import { ApprovalEntity } from 'src/database/entities/approval.entity'
import { EmailModule } from '../email/email.module'
import { S3Module } from '../s3/s3.module'

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
            ImageEntity,
            ApprovalEntity
        ]),
        RatingModule,
        EmailModule,
        S3Module
    ],
    controllers: [ProductController],
    providers: [ProductService, SpecificationService],
    exports: []
})
export class ProductModule {}
