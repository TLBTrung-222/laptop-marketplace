import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Session
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApprovalService } from '../service/approval.service'
import { CreateApprovalDto } from '../dto/approval.dto'
import { Session as ExpressSession } from 'express-session'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'

@ApiTags('approval')
@Controller('approvals')
export class ApprovalController {
    constructor(private approvalService: ApprovalService) {}

    @Auth([RoleId.Seller])
    @Get()
    getApprovals(@Session() session: ExpressSession) {
        const sellerId = session.accountId
        return this.approvalService.findApprovalsFromSeller(sellerId)
    }

    @Auth([RoleId.Seller])
    @Delete(':id')
    deleteApproval(
        @Param('id') approvalId: string,
        @Session() session: ExpressSession
    ) {
        const sellerId = session.accountId
        return this.approvalService.deleteApproval(
            parseInt(approvalId),
            sellerId
        )
    }
}
