import { ApiProperty } from '@nestjs/swagger'
import {
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsPhoneNumber,
    IsNumber,
    IsEnum,
    Min
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
    @IsNumber()
    brand: number

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    category: number

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(2)
    name: string

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Min(0)
    stock_quantity: number

    @ApiProperty()
    @IsOptional()
    @IsEnum(ProductStatus)
    status: ProductStatus
}
