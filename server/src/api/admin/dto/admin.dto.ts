import { IsEnum } from 'class-validator'
import { ApprovalStatus } from 'src/shared/enum/approval.enum'

export class ReviewApprovalDto {
    @IsEnum(ApprovalStatus)
    status: ApprovalStatus
}
