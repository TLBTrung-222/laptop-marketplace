import {
    BadRequestException,
    Body,
    Controller,
    Post,
    Session
} from '@nestjs/common'
import { Serialize } from 'src/shared/interceptor/serialize.interceptor'
import {
    LoginAccountDto,
    SignUpAccountDto,
    ViewAccountDto
} from 'src/api/account/dto/account.dto'
import { AuthService } from '../service/auth.service'
import { RoleId } from 'src/shared/enum/role.enum'
import { Session as ExpressSession } from 'express-session'

// auth controller handle signin/signup route, auth service validate logic, account service handle the CRUD of account
@Serialize(ViewAccountDto)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    async signInUser(
        @Body() body: LoginAccountDto,
        @Session() session: ExpressSession
    ) {
        const account = await this.authService.signIn(body)
        session.accountId = account.id
        return account
    }

    @Post('/buyer/signup')
    async signUpBuyer(
        @Body() body: SignUpAccountDto,
        @Session() session: ExpressSession
    ) {
        const account = await this.authService.signUp(body, RoleId.Buyer)
        session.accountId = account.id
        return account
    }

    @Post('/seller/signup')
    async signUpSeller(
        @Body() body: SignUpAccountDto,
        @Session() session: any
    ) {
        const account = await this.authService.signUp(body, RoleId.Seller)
        session.accountId = account.id
        return account
    }

    @Post('/signout')
    async signOut(@Session() session: ExpressSession) {
        return new Promise((resolve, reject) => {
            session.destroy((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('Logout successful')
                }
            })
        }).catch(() => {
            throw new BadRequestException('signout unsuccesfully')
        })
    }
}
