import { Module } from '@nestjs/common'
import { AdminController } from './controller/admin.controller'
import { ApprovalModule } from '../approval/approval.module'
import { OrderModule } from '../order/order.module'
import { ShippingModule } from '../shipping/shipping.module'

@Module({
    imports: [ApprovalModule, OrderModule, ShippingModule],
    controllers: [AdminController]
})
export class AdminModule {}
