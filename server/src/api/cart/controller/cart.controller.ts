import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CartService } from '../service/cart.service'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'
import { CurrentAccount } from 'src/shared/decorator/current-account.decorator'
import { AccountEntity } from 'src/database/entities/account.entity'
import { CartDto, UpdateItemDto } from '../dto/cart.dto'

@Auth([RoleId.Buyer])
@ApiTags('carts')
@Controller('carts')
export class CartController {
    constructor(private cartService: CartService) {}

    @Post()
    createCart(@CurrentAccount() buyer: AccountEntity) {
        return this.cartService.create(buyer)
    }

    @Get()
    getCartItems(@CurrentAccount() buyer: AccountEntity) {
        return this.cartService.getItems(buyer)
    }

    @Post('/items')
    addCartItem(@CurrentAccount() buyer: AccountEntity, @Body() body: CartDto) {
        return this.cartService.addItem(buyer, body)
    }

    @Put('/items/:productId')
    updateCart(
        @CurrentAccount() buyer: AccountEntity,
        @Param('productId', ParseIntPipe) productId: number,
        @Body() body: UpdateItemDto
    ) {
        return this.cartService.addItem(buyer, {
            productId,
            quantity: body.quantity
        })
    }

    @Delete('/items/:productId')
    deleteCartItem(@Param('productId', ParseIntPipe) productId: number) {
        return this.cartService.deleteItem(productId)
    }
}
