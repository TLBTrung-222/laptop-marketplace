import { ApiProperty } from '@nestjs/swagger'
import {
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsPhoneNumber,
    IsNumber,
    IsEnum
} from 'class-validator'
import { ProductStatus } from 'src/database/entities/product.entity'

export class createProductDto {
    @ApiProperty()
    @IsNumber()
    brand: number

    @ApiProperty()
    @IsNumber()
    category: number

    @ApiProperty()
    @IsString()
    @MinLength(2)
    name: string

    @ApiProperty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsString()
    description:string

    @ApiProperty()
    @IsNumber()
    stock_quantity:number

    @ApiProperty()
    @IsEnum(ProductStatus)
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
