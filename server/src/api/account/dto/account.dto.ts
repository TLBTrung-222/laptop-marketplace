import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import {
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsPhoneNumber
} from 'class-validator'

export class LoginAccountDto {
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(12)
    password: string
}

export class SignUpAccountDto {
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(12)
    password: string

    @ApiProperty()
    @IsPhoneNumber('VN')
    phoneNumber: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(12)
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    avatar?: Buffer
}

export class ViewAccountDto {
    @ApiProperty()
    @Expose()
    id: string

    @ApiProperty()
    @Expose()
    email: string

    @ApiProperty()
    @Expose()
    phoneNumber: string

    @ApiProperty()
    @Expose()
    name: string

    @ApiProperty()
    @Expose()
    avatar: Buffer
}

export class UpdateAccountDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsPhoneNumber('VN')
    phoneNumber: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(12)
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    avatar: Buffer
}
