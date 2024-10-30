import { ApiProperty } from '@nestjs/swagger'
import {
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsPhoneNumber
} from 'class-validator'
import { ProductStatus } from 'src/database/entities/product.entity'

export class createProductDto {
    @ApiProperty()
    brand: number

    @ApiProperty()
    category: number

    @ApiProperty()
    name: string

    @ApiProperty()
    @MinLength(1)
    price: number

    @ApiProperty()
    @IsOptional()
    description:string

    @ApiProperty()
    stock_quantity:number

    @ApiProperty()
    @IsOptional()
    status:ProductStatus
}
export class updateProductDto {
    @ApiProperty()
    @IsOptional()
    brand: number

    @ApiProperty()
    @IsOptional()
    category: number

    @ApiProperty()
    @IsOptional()
    name: string

    @ApiProperty()
    @MinLength(1)
    @IsOptional()
    price: number

    @ApiProperty()
    @IsOptional()
    description: string

    @ApiProperty()
    @IsOptional()
    stock_quantity: number

    @ApiProperty()
    @IsOptional()
    status: ProductStatus
}
