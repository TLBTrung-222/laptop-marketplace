import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class BrandDto{
    @ApiProperty()
    @IsString()
    @MinLength(1)
    name:string;
}