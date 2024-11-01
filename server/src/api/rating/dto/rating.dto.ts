import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'

export class CreateRatingDto {
    @ApiProperty()
    @Min(1)
    @Max(5)
    @IsNumber()
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
    @IsNumber()
    ratingStar: number

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    comment: string
}
