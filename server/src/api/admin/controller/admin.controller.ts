import { Body, Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common'
import { ApprovalService } from 'src/api/approval/service/approval.service'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'
import { ReviewApprovalDto } from '../dto/admin.dto'
import { OrderService } from 'src/api/order/service/order.service'
import { UpdateShippingStatusDto } from 'src/api/shipping/dto/shipping.dto'
import { ShippingService } from 'src/api/shipping/service/shipping.service'

@Auth([RoleId.Admin])
@Controller('admin')
export class AdminController {
    constructor(
        private approvalService: ApprovalService,
        private orderService: OrderService,
        private shippingService: ShippingService
    ) {}

    @Get('approvals')
    async getApprovals() {
        return this.approvalService.getAllApprovals()
    }

    @Get('approvals/:id')
    async getApproval(@Param('id', ParseIntPipe) id: number) {
        return this.approvalService.getApproval(id)
    }

    @Put('approvals/:id')
    async review(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: ReviewApprovalDto
    ) {
        return this.approvalService.review(id, body)
    }

    @Get('orders')
    async getAllOrders() {
        return this.orderService.getOrdersAdmin()
    }

    @Put('orders/:id/shipping')
    async updateShippingStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateShippingStatusDto
    ) {
        return this.shippingService.updateShippingStatus(id, body)
    }
}
