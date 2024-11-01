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

export class CreateProductDto {
    @ApiProperty()
    @IsNumber()
    brandId: number

    @ApiProperty()
    @IsNumber()
    categoryId: number

    @ApiProperty()
    @IsString()
    @MinLength(2)
    name: string

    @ApiProperty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNumber()
    stock_quantity: number

    @ApiProperty()
    @IsEnum(ProductStatus)
    status: ProductStatus
}
export class UpdateProductDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    brandId: number

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    categoryId: number

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
