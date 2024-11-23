import { IsEnum, IsIP, IsNumber, IsOptional } from 'class-validator'

// infor filled in by user
export enum BankCode {
    VNPAYQR = 'VNPAYQR',
    VNBANK = 'VNBANK',
    INTCARD = 'INTCARD'
}
