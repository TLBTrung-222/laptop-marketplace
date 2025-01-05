import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { AccountService } from 'src/api/account/service/account.service'
import { EmailService } from 'src/api/email/service/email.service'
import { RoleId } from 'src/shared/enum/role.enum'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private accountService: AccountService,
        private emailService: EmailService,
        private configService: ConfigService
    ) {
        super({
            clientID: configService.get('GOOGLE_AUTH_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
            callbackURL: configService.get('GOOGLE_AUTH_CALLBACK_URL'),
            scope: ['email', 'profile']
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ) {
        const { sub: googleId, email, name, picture } = profile._json

        try {
            let account = await this.accountService.findByEmail(email)

            if (!account) {
                // Create new account if not exists
                account = await this.accountService.create(
                    {
                        email,
                        name,
                        // avatar: picture,
                        googleId,
                        password: null // No password for Google login
                    },
                    RoleId.Buyer
                )

                // only send email to this new OAuth account
                await this.emailService.sendSignUpEmail(account.email)
            }
            return account
        } catch (error) {
            done(error, false)
        }
    }
}
