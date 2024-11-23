import { BankCode } from 'src/api/payment/dto/payment.dto'
import { OrderEntity } from 'src/database/entities/order.entity'

export interface ApiResponse {
    isSuccess: boolean
    data: any
    errors: string | string[] | null
}

export interface VnpParams {
    [key: string]: string
    vnp_TmnCode: string
    vnp_ReturnUrl: string
    vnp_Version: string
    vnp_Command: string
    vnp_Locale: string
    vnp_CurrCode: string
    vnp_OrderType: string
    vnp_TxnRef: string
    vnp_OrderInfo: string
    vnp_Amount: string
    vnp_IpAddr: string
    vnp_BankCode?: string
    vnp_CreateDate: string
    vnp_ExpireDate?: string
    vnp_SecureHash: string
}

export interface PaymentUrlParams {
    order: OrderEntity
    ipAddress: string
    bankCode?: BankCode
}
