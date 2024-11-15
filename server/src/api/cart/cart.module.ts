import { Module } from '@nestjs/common'
import { CartController } from './controller/cart.controller'
import { CartService } from './service/cart.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartEntity } from 'src/database/entities/cart.entity'
import { ProductEntity } from 'src/database/entities/product.entity'
import { CartToProductEntity } from 'src/database/entities/cart-to-product'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CartEntity,
            ProductEntity,
            CartToProductEntity
        ])
    ],
    controllers: [CartController],
    providers: [CartService]
})
export class CartModule {}
