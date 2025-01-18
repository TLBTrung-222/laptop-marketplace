import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import {
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsPhoneNumber
} from 'class-validator'
import { RoleEntity } from 'src/database/entities/role.entity'
import { RoleId } from 'src/shared/enum/role.enum'

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
    @IsOptional() // for google sign in/up
    @IsString()
    @MinLength(3)
    @MaxLength(12)
    password: string

    @ApiProperty()
    @IsOptional()
    @IsPhoneNumber('VN')
    phoneNumber?: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(12)
    name: string

    @IsOptional()
    googleId?: string
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
    avatar: string

    @Expose()
    @Type(() => ViewRoleDto)
    role: RoleEntity
}

export class ViewRoleDto {
    @Expose()
    roleName: RoleId
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
    avatar: string
}
