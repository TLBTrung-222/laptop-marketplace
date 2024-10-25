import { Body, Controller, Post, Session, UseGuards } from '@nestjs/common'
import { Serialize } from 'src/shared/interceptor/serialize.interceptor'
import {
    LoginAccountDto,
    SignUpAccountDto,
    ViewAccountDto
} from 'src/api/account/dto/account.dto'
import { AuthService } from '../service/auth.service'
import { RoleId } from 'src/api/role/enum/role.enum'
import { Role } from 'src/shared/decorator/role.decorator'
import { RoleGuard } from 'src/shared/guard/Role.guard'

// auth controller handle signin/signup route, auth service validate logic, account service handle the CRUD of account
@Serialize(ViewAccountDto)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    @Role(RoleId.Admin)
    @UseGuards(RoleGuard)
    signInUser(@Body() body: LoginAccountDto) {
        return this.authService.signIn(body)
    }

    @Post('/buyer/signup')
    async signUpBuyer(@Body() body: SignUpAccountDto) {
        return this.authService.signUp(body, RoleId.Buyer)
    }

    @Post('/seller/signup')
    async signUpSeller(@Body() body: SignUpAccountDto) {
        return this.authService.signUp(body, RoleId.Seller)
    }
}
