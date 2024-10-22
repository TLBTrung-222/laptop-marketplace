import { Body, Controller, Post } from '@nestjs/common'
import { LoginUserDto, ViewUserDto } from '../dto/user.dto'
import { AuthService } from '../service/auth.service'
import { SignUpUserDto } from '../dto/user.dto'
import { Serialize } from 'src/shared/interceptor/serialize.interceptor'

// auth controller handle signin/signup route, auth service validate logic, account service handle the CRUD of account
@Serialize(ViewUserDto)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    signInUser(@Body() body: LoginUserDto) {
        return this.authService.signIn(body)
    }

    @Post('signup')
    async signUpUser(@Body() body: SignUpUserDto) {
        //    return this.authService.
        return this.authService.signUp(body)
    }

    //! TODO: Signup/Signin seller
    //! TODO: serialize response
}
