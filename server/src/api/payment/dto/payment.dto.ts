import { IsEnum, IsOptional } from 'class-validator'

// infor filled in by user
enum BankCode {
    VNPAYQR = 'VNPAYQR',
    VNBANK = 'VNBANK',
    INTCARD = 'INTCARD'
}

export class CreatePaymentDto {
    @IsOptional()
    @IsEnum(BankCode)
    bankCode: BankCode
}
