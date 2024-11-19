import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    Ip,
    Query
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { OrderService } from '../service/order.service'
import { CreateOrderDto, UpdateOrderStatusDto } from '../dto/order.dto'
import { CurrentAccount } from 'src/shared/decorator/current-account.decorator'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'
import { PaymentService } from 'src/api/payment/service/payment.service'
import { CreatePaymentDto } from 'src/api/payment/dto/payment.dto'
import { VnpParams } from 'src/types'

// @Auth([RoleId.Buyer])
@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(
        private orderService: OrderService,
        private paymentService: PaymentService
    ) {}

    /* -------------------------------------------------------------------------- */
    /*                               Payment routes                               */
    /* -------------------------------------------------------------------------- */
    @Post(':id/payment')
    async processPayment(
        @Param('id', ParseIntPipe) orderId: number,
        @Ip() ip: string,
        @Body() body: CreatePaymentDto
    ) {
        return this.paymentService.createPaymentUrl(ip, orderId, body.bankCode)
    }

    // called by vnpay
    @Get('return_url')
    async returnUrl(@Query() vnpParams: VnpParams) {
        return this.paymentService.handleReturnUrl(vnpParams)
    }

    /* -------------------------------------------------------------------------- */
    /*                                Order routes                                */
    /* -------------------------------------------------------------------------- */
    @Get()
    getAllOrders(@CurrentAccount() buyer: AccountEntity) {
        return this.orderService.getOrders(buyer)
    }

    @Get(':id')
    getOrderWithId(
        @CurrentAccount() buyer: AccountEntity,
        @Param('id') orderId: string
    ) {
        return this.orderService.getOrder(buyer, orderId)
    }

    @Get(':id/items')
    getOrderItems(
        @CurrentAccount() buyer: AccountEntity,
        @Param('id') orderId: string
    ) {
        return this.orderService.getOrderItems(buyer, orderId)
    }

    @Put(':id/status')
    updateOrderStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateOrderStatusDto
    ) {
        return this.orderService.updateOrderStatus(id, body.newStatus)
    }

    @Post()
    createOrder(
        @CurrentAccount() buyer: AccountEntity,
        @Body() body: CreateOrderDto
    ) {
        return this.orderService.createOrder(buyer, body)
    }

    @Put(':id')
    updateOrder(@Param('id') id: string, @Body() body: any) {
        return `update order ${id} with body: ${JSON.stringify(body)}`
    }

    @Auth([RoleId.Admin])
    @Delete(':id')
    deleteOrder(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.deleteOrder(id)
    }
}
