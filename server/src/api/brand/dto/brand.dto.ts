import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'

export class ViewBrandDto {
    @ApiProperty()
    @Expose()
    name: string
}

export class BrandDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    name: string
}
