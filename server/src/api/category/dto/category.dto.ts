import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class CategoryDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @Expose()
    type: string;
}