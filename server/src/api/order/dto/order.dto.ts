import { Transform, Type } from 'class-transformer'
import {
    ArrayMinSize,
    IsAlpha,
    IsArray,
    IsEnum,
    IsNumber,
    IsString,
    Min,
    ValidateNested
} from 'class-validator'
import { OrderStatus } from 'src/shared/enum/order.enum'

// user will sent a list of product_id with quantity
export class OrderItem {
    @IsNumber()
    @Min(0)
    productId: number

    @IsNumber()
    @Min(0)
    quantity: number
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested()
    @ArrayMinSize(1, { message: 'orderItems must contain at least one item' })
    @Type(() => OrderItem)
    orderItems: OrderItem[]
}

export class UpdateOrderStatusDto {
    @IsString()
    @IsEnum(OrderStatus)
    newStatus: OrderStatus
}
