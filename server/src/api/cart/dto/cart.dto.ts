import { IsNumber, Min } from 'class-validator'

export class UpdateItemDto {
    @IsNumber()
    @Min(0)
    quantity: number
}

export class CartDto {
    @IsNumber()
    productId: number

    @IsNumber()
    @Min(1)
    quantity: number
}
