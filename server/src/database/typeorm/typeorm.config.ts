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
import { OrderEntity } from '../entities/order.entity'
import { OrderToProductEntity } from '../entities/order-to-product.entity'
import { PaymentEntity } from '../entities/payment.entity'
import { ShippingEntity } from '../entities/shipping.entity'

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
                CartToProductEntity,
                OrderEntity,
                OrderToProductEntity,
                PaymentEntity,
                ShippingEntity
            ],
            synchronize: true,
            migrationsRun: false
        }
    }
}
