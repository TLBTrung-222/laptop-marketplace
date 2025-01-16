import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { CartEntity } from 'src/database/entities/cart.entity'
import { Repository } from 'typeorm'
import { CartDto, UpdateItemDto } from '../dto/cart.dto'
import { CartToProductEntity } from 'src/database/entities/cart-to-product.entity'
import { ProductEntity } from 'src/database/entities/product.entity'

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private cartRepository: Repository<CartEntity>,
        @InjectRepository(CartToProductEntity)
        private cartItemRepository: Repository<CartToProductEntity>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) {}

    // create cart for current buyer
    async create(buyer: AccountEntity) {
        // make sure buyer don't have cart yet
        const existCart = await this.cartRepository.findOne({
            where: { buyer }
        })
        if (existCart)
            throw new BadRequestException(
                'This buyer have already created cart'
            )
        const newCart = this.cartRepository.create({ buyer })
        return this.cartRepository.save(newCart)
    }

    // join carts, cart_item, products
    async getItems(buyer: AccountEntity) {
        const existCart = await this.cartRepository.findOne({
            where: { buyer }
        })

        if (!existCart)
            throw new BadRequestException('This buyer have not created cart')

        return this.cartItemRepository.find({ where: { cartId: existCart.id } })
    }

    async addItem(buyer: AccountEntity, body: CartDto) {
        const existCart = await this.cartRepository.findOne({
            where: { buyer }
        })
        if (!existCart)
            throw new BadRequestException('This buyer has not created a cart')

        const existProduct = await this.productRepository.findOne({
            where: { id: body.productId }
        })
        if (!existProduct) throw new BadRequestException('Product not found')

        // Use upsert to either create a new cart item or update the quantity
        await this.cartItemRepository.upsert(
            {
                cartId: existCart.id,
                productId: body.productId,
                quantity: body.quantity
            },
            ['cartId', 'productId'] // Conflict columns
        )

        // Return the updated or newly added cart item
        return this.cartItemRepository.findOne({
            where: { cartId: existCart.id, productId: body.productId }
        })
    }

    async deleteItem(productId: number) {
        const existCartItem = await this.cartItemRepository.findOne({
            where: { productId }
        })
        if (!existCartItem) throw new NotFoundException('Cart item not found')

        return this.cartItemRepository.delete(existCartItem)
    }
}
