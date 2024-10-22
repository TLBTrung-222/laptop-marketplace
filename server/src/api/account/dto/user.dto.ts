import { Expose } from 'class-transformer'
import {
    IsEmail,
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
    IsPhoneNumber
} from 'class-validator'

export class LoginUserDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(3)
    @MaxLength(12)
    password: string
}

export class SignUpUserDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(3)
    @MaxLength(12)
    password: string

    @IsPhoneNumber('VN')
    phoneNumber: string

    @IsString()
    name: string

    @IsOptional()
    avatar?: Buffer
}

export class ViewUserDto {
    @Expose()
    id: string

    @Expose()
    email: string

    @Expose()
    phoneNumber: string

    @Expose()
    name: string

    @Expose()
    avatar: Buffer
}
