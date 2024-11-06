import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min
} from 'class-validator'
import { ViewAccountDto } from 'src/api/account/dto/account.dto'

export class ViewRatingDto {
    @ApiProperty()
    @Expose()
    id: number

    @ApiProperty()
    @Expose()
    ratingStar: number

    @ApiPropertyOptional()
    @Expose()
    comment: string

    @ApiProperty()
    @Expose()
    @Type(() => ViewAccountDto)
    buyer: ViewAccountDto
}

export class CreateRatingDto {
    @ApiProperty()
    @Min(1)
    @Max(5)
    @IsInt()
    ratingStar: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    comment: string
}

export class UpdateRatingDto {
    @ApiPropertyOptional()
    @IsOptional()
    @Min(1)
    @Max(5)
    @IsInt()
    ratingStar: number

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    comment: string
}
