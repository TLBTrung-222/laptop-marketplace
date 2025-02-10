import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Redirect,
    Req,
    Session,
    UseGuards
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
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { AccountEntity } from 'src/database/entities/account.entity'
import { EmailService } from 'src/api/email/service/email.service'

// auth controller handle signin/signup route, auth service validate logic, account service handle the CRUD of account
@ApiTags('auth')
@Serialize(ViewAccountDto)
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private emailService: EmailService
    ) {}

    /* -------------------------------------------------------------------------- */
    /*                              Google sign in/up                             */
    /* -------------------------------------------------------------------------- */
    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    handleGoogleLogin() {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    @Redirect()
    async handleRedirect(
        @Req() request: Request,
        @Session() session: ExpressSession
    ) {
        session.accountId = (request.account as AccountEntity).id // trigger set cookie to client
        // email will be sent in google strategy code
        return {
            url: 'https://laptop-marketplace.shop/'
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                Local sign in/up                            */
    /* -------------------------------------------------------------------------- */
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
        await this.emailService.sendSignUpEmail(account.email)
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
        @Session() session: ExpressSession
    ) {
        const account = await this.authService.signUp(body, RoleId.Seller)
        session.accountId = account.id
        await this.emailService.sendSignUpEmail(account.email)
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
