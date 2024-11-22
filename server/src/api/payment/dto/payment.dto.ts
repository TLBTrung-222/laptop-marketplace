import { IsEnum, IsIP, IsNumber, IsOptional } from 'class-validator'

// infor filled in by user
enum BankCode {
    VNPAYQR = 'VNPAYQR',
    VNBANK = 'VNBANK',
    INTCARD = 'INTCARD'
}

export class _CreateVNPAYPaymentDto {
    @IsNumber()
    orderId: number

    @IsOptional()
    @IsEnum(BankCode)
    bankCode: BankCode
}

export class CreateVNPAYPaymentDto extends _CreateVNPAYPaymentDto {
    ipAddress: string
}
