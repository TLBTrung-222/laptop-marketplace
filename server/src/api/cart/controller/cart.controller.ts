import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('carts')
@Controller('carts')
export class CartController {
    @Get()
    getCart() {
        return 'return account cart'
    }

    @Post('/items')
    addCartItem() {
        return 'Add item to cart '
    }

    @Put('/items/:productId')
    updateCart(@Param('productId') productId: string) {
        return `Update cart item quantity with id: ${productId}`
    }

    @Delete('/items/:productId')
    deleteCartItem(@Param('productId') productId: string) {
        return `Remove cart item with id: ${productId}`
    }
}
