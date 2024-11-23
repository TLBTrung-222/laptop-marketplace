import { Expose, Transform, Type } from 'class-transformer'
import {
    ArrayMinSize,
    IsArray,
    IsDefined,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateNested
} from 'class-validator'
import { ViewAccountDto } from 'src/api/account/dto/account.dto'
import { BankCode } from 'src/api/payment/dto/payment.dto'
import { CreateShippingDto } from 'src/api/shipping/dto/shipping.dto'
import { OrderStatus } from 'src/shared/enum/order.enum'
import { PaymentMethod } from 'src/shared/enum/payment.enum'

// user will sent a list of product_id with quantity
export class OrderItemDto {
    @IsNumber()
    @Min(0)
    productId: number

    @IsNumber()
    @Min(0)
    quantity: number
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1, { message: 'orderItems must contain at least one item' })
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[]

    @IsDefined()
    @ValidateNested()
    @Type(() => CreateShippingDto)
    shippingInfors: CreateShippingDto

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod

    @IsOptional()
    @IsEnum(BankCode)
    bankCode: BankCode
}

export class UpdateOrderStatusDto {
    @IsString()
    @IsEnum(OrderStatus)
    newStatus: OrderStatus
}

export class ViewOrderDto {
    @Expose()
    id: number

    @Expose()
    totalAmount: number

    @Expose()
    orderStatus: OrderStatus

    @Expose()
    orderDate: Date

    @Expose()
    completionDate: Date

    @Expose()
    @Type(() => ViewAccountDto)
    buyer: ViewAccountDto
}

export class ViewCreatedOrderDto {
    @Expose()
    @Type(() => ViewOrderDto)
    savedOrder: ViewOrderDto

    @Expose()
    paymentUrl?: string
}
