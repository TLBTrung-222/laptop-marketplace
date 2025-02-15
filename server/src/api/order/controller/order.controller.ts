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
    Query,
    Redirect
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { OrderService } from '../service/order.service'
import {
    CreateOrderDto,
    UpdateOrderStatusDto,
    ViewCreatedOrderDto
} from '../dto/order.dto'
import { CurrentAccount } from 'src/shared/decorator/current-account.decorator'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'
import { PaymentService } from 'src/api/payment/service/payment.service'
import { VnpParams } from 'src/types'
import { Serialize } from 'src/shared/interceptor/serialize.interceptor'
import { ShippingService } from 'src/api/shipping/service/shipping.service'
import { UpdateShippingDto } from 'src/api/shipping/dto/shipping.dto'

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(
        private orderService: OrderService,
        private paymentService: PaymentService,
        private shippingService: ShippingService
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
    @Get('vnpay_return')
    @Redirect()
    async returnUrl(@Query() vnpParams: VnpParams) {
        const txnResult = await this.paymentService.handleReturnUrl(vnpParams)
        if (txnResult.vnp_TransactionStatus == '00') {
            return {
                url: `https://laptop-marketplace.shop/order/order-success/?vnp_TransactionStatus=${txnResult.vnp_TransactionStatus}&vnp_TxnRef=${txnResult.vnp_TxnRef}&vnp_Amount=${txnResult.vnp_Amount}&vnp_PayDate=${txnResult.vnp_Paydate}`
            }
        } else
            return {
                url: `https://laptop-marketplace.shop/order/order-success/?vnp_TransactionStatus=${txnResult.vnp_TransactionStatus}`
            }
    }

    /* -------------------------------------------------------------------------- */
    /*                                Order routes                                */
    /* -------------------------------------------------------------------------- */
    @Auth([RoleId.Buyer])
    @Get()
    async getAllOrders(@CurrentAccount() buyer: AccountEntity) {
        return this.orderService.getOrders(buyer)
    }

    @Auth([RoleId.Buyer])
    @Get(':id')
    getOrderWithId(
        @CurrentAccount() buyer: AccountEntity,
        @Param('id') orderId: string
    ) {
        return this.orderService.getOrder(buyer, orderId)
    }

    @Auth([RoleId.Buyer])
    @Get(':id/items')
    getOrderItems(
        @CurrentAccount() buyer: AccountEntity,
        @Param('id') orderId: string
    ) {
        return this.orderService.getOrderItems(buyer, orderId)
    }

    @Auth([RoleId.Buyer])
    @Put(':id/status')
    updateOrderStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateOrderStatusDto
    ) {
        return this.orderService.updateOrderStatus(id, body.newStatus)
    }

    @Serialize(ViewCreatedOrderDto)
    @Auth([RoleId.Buyer])
    @Post()
    createOrder(
        @CurrentAccount() buyer: AccountEntity,
        @Body() body: CreateOrderDto,
        @Ip() ipAddress: string
    ) {
        return this.orderService.createOrder(buyer, body, ipAddress)
    }
    @Auth([RoleId.Buyer])
    @Put(':id')
    updateOrder(@Param('id') id: string, @Body() body: any) {
        return `update order ${id} with body: ${JSON.stringify(body)}`
    }

    @Auth([RoleId.Admin])
    @Delete(':id')
    deleteOrder(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.deleteOrder(id)
    }

    /* -------------------------------------------------------------------------- */
    /*                               Shipping routes                              */
    /* -------------------------------------------------------------------------- */
    @Get(':id/shipping')
    async getShipping(@Param('id', ParseIntPipe) id: number) {
        return this.shippingService.getShipping(id)
    }

    @Put(':id/shipping')
    async updateShipping(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateShippingDto
    ) {
        return this.shippingService.updateShipping(id, body)
    }
}
