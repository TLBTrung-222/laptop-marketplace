import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateRatingDto{
    @ApiProperty()
    @MinLength(1)
    product_id: number;

    @ApiProperty()
    rating_star: number;

    @ApiPropertyOptional()
    @IsOptional()
    comment: string;
}

export class UpdateRatingDto{
    @ApiPropertyOptional()
    @IsOptional()
    rating_star: number;

    @ApiPropertyOptional()
    @IsString()
    comment: string;
}