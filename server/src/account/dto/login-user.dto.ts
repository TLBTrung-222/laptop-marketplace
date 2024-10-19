import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginUserDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(3)
    @MaxLength(12)
    password: string
}
