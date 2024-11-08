import { IsNumber } from 'class-validator'

// export class ViewApprovalDto {}

export class CreateApprovalDto {
    @IsNumber()
    productId: number
}
