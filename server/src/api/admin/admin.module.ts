import { Module } from '@nestjs/common'
import { AdminController } from './controller/admin.controller'
import { ApprovalModule } from '../approval/approval.module'

@Module({
    imports: [ApprovalModule],
    controllers: [AdminController]
})
export class AdminModule {}
