import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class CreateRatingDto{
    @ApiProperty()
    @IsNumber()
    product_id: number;

    @ApiProperty()
    @Min(1)
    @Max(5)
    @IsNumber()
    rating_star: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    comment: string;
}

export class UpdateRatingDto{
    @ApiPropertyOptional()
    @IsOptional()
    @Min(1)
    @Max(5)
    @IsNumber()
    rating_star: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    comment: string;
}