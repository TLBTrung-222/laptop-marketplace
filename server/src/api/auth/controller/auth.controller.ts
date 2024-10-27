import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
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
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'

// auth controller handle signin/signup route, auth service validate logic, account service handle the CRUD of account
@ApiTags('auth')
@Serialize(ViewAccountDto)
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Sign in account locally' })
    @ApiOkResponse({ description: 'Sign in succesfully', type: ViewAccountDto })
    @ApiNotFoundResponse({ description: 'Email not founded' })
    @ApiUnauthorizedResponse({ description: 'Wrong password' })
    @Post('signin')
    @HttpCode(200) // use for sign in/sign out becuz they don't create resouce on db
    async signInAccount(
        @Body() body: LoginAccountDto,
        @Session() session: ExpressSession
    ) {
        const account = await this.authService.signIn(body)
        session.accountId = account.id
        return account
    }

    @ApiOperation({ summary: 'Sign up new buyer account' })
    @ApiCreatedResponse({
        description: 'New buyer account created',
        type: ViewAccountDto
    })
    @ApiBadRequestResponse({ description: 'Email already existed' })
    @Post('/buyer/signup')
    async signUpBuyer(
        @Body() body: SignUpAccountDto,
        @Session() session: ExpressSession
    ) {
        const account = await this.authService.signUp(body, RoleId.Buyer)
        session.accountId = account.id
        return account
    }

    @ApiOperation({ summary: 'Sign up new seller account' })
    @ApiCreatedResponse({
        description: 'New seller account created',
        type: ViewAccountDto
    })
    @ApiBadRequestResponse({ description: 'Email already existed' })
    @Post('/seller/signup')
    async signUpSeller(
        @Body() body: SignUpAccountDto,
        @Session() session: any
    ) {
        const account = await this.authService.signUp(body, RoleId.Seller)
        session.accountId = account.id
        return account
    }

    @ApiOperation({ summary: 'Sign out account' })
    @ApiOkResponse({ description: 'Logout successful', type: ViewAccountDto })
    @ApiBadRequestResponse({ description: 'Signout unsuccessful' })
    @Post('/signout')
    @HttpCode(200)
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
