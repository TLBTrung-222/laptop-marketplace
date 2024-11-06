import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator'

export class ViewSpecificationDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Expose()
    cpu: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    ram: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    storage: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Expose()
    gpu: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Expose()
    display: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Expose()
    port: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Expose()
    keyboard: string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    lan: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    wifi: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    bluetooth: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    webcam: boolean

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Expose()
    os: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    battery: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    weight: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Expose()
    color: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Expose()
    dimensions: string
}

export class CreateSpecificationDto {
    @IsNotEmpty()
    @IsString()
    cpu: string

    @IsNotEmpty()
    @IsNumber()
    ram: number

    @IsNotEmpty()
    @IsNumber()
    storage: number

    @IsNotEmpty()
    @IsString()
    gpu: string

    @IsNotEmpty()
    @IsString()
    display: string

    @IsNotEmpty()
    @IsString()
    port: string

    @IsNotEmpty()
    @IsString()
    keyboard: string

    @IsNotEmpty()
    @IsBoolean()
    lan: boolean

    @IsNotEmpty()
    @IsBoolean()
    wifi: boolean

    @IsNotEmpty()
    @IsBoolean()
    bluetooth: boolean

    @IsNotEmpty()
    @IsBoolean()
    webcam: boolean

    @IsNotEmpty()
    @IsString()
    os: string

    @IsNotEmpty()
    @IsNumber()
    battery: number

    @IsNotEmpty()
    @IsNumber()
    weight: number

    @IsNotEmpty()
    @IsString()
    color: string

    @IsNotEmpty()
    @IsString()
    dimensions: string
}

export class UpdateSpecificationDto {
    @IsOptional()
    @IsString()
    cpu?: string

    @IsOptional()
    @IsNumber()
    ram?: number

    @IsOptional()
    @IsNumber()
    storage?: number

    @IsOptional()
    @IsString()
    gpu?: string

    @IsOptional()
    @IsString()
    display?: string

    @IsOptional()
    @IsString()
    port?: string

    @IsOptional()
    @IsString()
    keyboard?: string

    @IsOptional()
    @IsBoolean()
    lan?: boolean

    @IsOptional()
    @IsBoolean()
    wifi?: boolean

    @IsOptional()
    @IsBoolean()
    bluetooth?: boolean

    @IsOptional()
    @IsBoolean()
    webcam?: boolean

    @IsOptional()
    @IsString()
    os?: string

    @IsOptional()
    @IsNumber()
    battery?: number

    @IsOptional()
    @IsNumber()
    weight?: number

    @IsOptional()
    @IsString()
    color?: string

    @IsOptional()
    @IsString()
    dimensions?: string
}
