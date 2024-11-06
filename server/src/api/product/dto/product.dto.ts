import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
    IsString,
    MinLength,
    IsOptional,
    IsNumber,
    IsEnum,
    Min,
    IsNotEmpty
} from 'class-validator'
import { ViewAccountDto } from 'src/api/account/dto/account.dto'
import { ViewBrandDto } from 'src/api/brand/dto/brand.dto'
import { ViewCategoryDto } from 'src/api/category/dto/category.dto'
import { ViewRatingDto } from 'src/api/rating/dto/rating.dto'
import { ViewSpecificationDto } from 'src/api/specification/dto/specification.dto'
import { ProductStatus } from 'src/enum/product/product.enum'

export class ViewProductDto {
    @ApiProperty()
    @IsNumber()
    id: number

    @ApiProperty()
    @Expose()
    name: string

    @ApiProperty()
    @Expose()
    price: number

    @ApiProperty()
    @Expose()
    description: string

    @ApiProperty()
    @Expose()
    stock_quantity: number

    @ApiProperty()
    @Expose()
    status: ProductStatus

    @ApiProperty()
    @Expose()
    @Type(() => ViewAccountDto)
    seller: ViewAccountDto

    @ApiProperty()
    @Expose()
    @Type(() => ViewBrandDto)
    brand: ViewBrandDto

    @ApiProperty()
    @Expose()
    @Type(() => ViewCategoryDto)
    category: ViewCategoryDto

    @ApiProperty()
    @Expose()
    @Type(() => ViewRatingDto)
    ratings: ViewRatingDto[]

    @ApiProperty()
    @Expose()
    @Type(() => ViewSpecificationDto)
    specification: ViewSpecificationDto[]

    @ApiProperty()
    @Expose()
    @Type(() => ViewImageDto)
    imageId: ViewImageDto[];
}

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

export class ViewImageDto{
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    image: Buffer;
}