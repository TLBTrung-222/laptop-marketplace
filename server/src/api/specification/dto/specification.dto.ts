import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ViewSpecificationDto {
    @ApiProperty()
    @Expose()
    id: number

    @ApiProperty()
    @Expose()
    cpu: string

    @ApiProperty()
    @Expose()
    ram: number

    @ApiProperty()
    @Expose()
    storage: number

    @ApiProperty()
    @Expose()
    gpu: string

    @ApiProperty()
    @Expose()
    display: string

    @ApiProperty()
    @Expose()
    port: string

    @ApiProperty()
    @Expose()
    keyboard: string

    @ApiProperty()
    @Expose()
    lan: string

    @ApiProperty()
    @Expose()
    wifi: string

    @ApiProperty()
    @Expose()
    bluetooth: string

    @ApiProperty()
    @Expose()
    webcam: string

    @ApiProperty()
    @Expose()
    os: string

    @ApiProperty()
    @Expose()
    battery: number

    @ApiProperty()
    @Expose()
    weight: number

    @ApiProperty()
    @Expose()
    color: string

    @ApiProperty()
    @Expose()
    dimensions: string
}

export class CreateSpecificationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cpu: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ram: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    storage: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gpu: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    display: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    port: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    keyboard: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lan: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    wifi: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bluetooth: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    webcam: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    os: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    battery: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    weight: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    color: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dimensions: string
}
