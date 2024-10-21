import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'

@Controller('orders')
export class OrderController {
    @Get()
    getAllOrders() {
        return 'return all orders'
    }

    @Get(':id')
    getOrderWithId(@Param('id') id: string) {
        return `get order with id ${id}`
    }

    @Get(':id/items')
    getOrderItems(@Param('id') id: string) {
        return `get items of order: ${id}`
    }

    @Put(':id/status')
    updateOrderStatus(
        @Param('id') id: string,
        @Body('newStatus') newStatus: string
    ) {
        return `update order ${id} with new status: ${newStatus}`
    }

    @Post()
    createOrder(@Body() body: any) {
        return `create order with body: ${JSON.stringify(body)}`
    }

    @Post(':id/payment')
    processOrderPayment(@Param('id') id: string) {
        return `process order ${id} with payment`
    }

    @Put(':id')
    updateOrder(@Param('id') id: string, @Body() body: any) {
        return `update order ${id} with body: ${JSON.stringify(body)}`
    }

    @Delete(':id')
    deleteOrder(@Param('id') id: string) {
        return `delete order with id ${id}`
    }
}
