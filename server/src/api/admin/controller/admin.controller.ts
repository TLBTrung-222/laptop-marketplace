import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { ApprovalService } from 'src/api/approval/service/approval.service'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'
import { ReviewApprovalDto } from '../dto/admin.dto'

@Auth([RoleId.Admin])
@Controller('admin')
export class AdminController {
    constructor(private approvalService: ApprovalService) {}

    @Get('approvals')
    async getApprovals() {
        return this.approvalService.getAllApprovals()
    }

    @Get('approvals/:id')
    async getApproval(@Param('id') id: string) {
        return this.approvalService.getApproval(parseInt(id))
    }

    @Put('approvals/:id')
    async review(@Param('id') id: string, @Body() body: ReviewApprovalDto) {
        return this.approvalService.review(parseInt(id), body)
    }
}
