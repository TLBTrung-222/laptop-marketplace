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
import {
    CreateOrderDto,
    UpdateOrderStatusDto,
    ViewCreatedOrderDto,
    ViewOrderDto
} from '../dto/order.dto'
import { CurrentAccount } from 'src/shared/decorator/current-account.decorator'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'
import { PaymentService } from 'src/api/payment/service/payment.service'
import { CreateVNPAYPaymentDto } from 'src/api/payment/dto/payment.dto'
import { VnpParams } from 'src/types'
import { Serialize } from 'src/shared/interceptor/serialize.interceptor'

@Auth([RoleId.Buyer])
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
    // @Post(':id/payment')
    // async processPayment(
    //     @Param('id', ParseIntPipe) orderId: number,
    //     @Ip() ipAddress: string,
    //     @Body() body: CreateVNPAYPaymentDto
    // ) {
    //     return this.paymentService.createPaymentUrl({
    //         ipAddress,
    //         orderId,
    //         bankCode: body.bankCode
    //     })
    // }

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

    @Serialize(ViewCreatedOrderDto)
    @Post()
    createOrder(
        @CurrentAccount() buyer: AccountEntity,
        @Body() body: CreateOrderDto,
        @Ip() ipAddress: string
    ) {
        return this.orderService.createOrder(buyer, body, {
            ...body.vnpayPaymentInfors,
            ipAddress
        })
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
