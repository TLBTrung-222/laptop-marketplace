import { Body, Controller, Post } from '@nestjs/common'
import { LoginUserDto } from '../dto/login-user.dto'

@Controller('auth')
export class AuthController {
    @Post('signin')
    signInUser(@Body() body: LoginUserDto) {
        return `user logged in with: ${body.email} - ${body.password}`
    }

    //! todo: add 'confirmPassword' to this Dto
    @Post('signup')
    signUpUser(@Body() body: LoginUserDto) {
        return `user signed up with: ${body.email} - ${body.password}`
    }
}
