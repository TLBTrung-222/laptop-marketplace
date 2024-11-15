import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { AccountEntity } from '../entities/account.entity'
import { RoleEntity } from '../entities/role.entity'
import { SessionEntity } from '../entities/session.entity'
import { CategoryEntity } from '../entities/category.entity'
import { BrandEntity } from '../entities/brand.entity'
import { RatingEntity } from '../entities/rating.entity'
import { ProductEntity } from '../entities/product.entity'
import { SpecificationEntity } from '../entities/specification.entity'
import { ImageEntity } from '../entities/image.entity'
import { ApprovalEntity } from '../entities/approval.entity'
import { CartToProductEntity } from '../entities/cart-to-product'
import { CartEntity } from '../entities/cart.entity'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'sqlite',
            database: 'dev.sqlite',
            entities: [
                AccountEntity,
                RoleEntity,
                SessionEntity,
                ProductEntity,
                BrandEntity,
                CategoryEntity,
                RatingEntity,
                SpecificationEntity,
                ImageEntity,
                ApprovalEntity,
                CartEntity,
                CartToProductEntity
            ],
            synchronize: true,
            migrationsRun: false
        }
    }
}
