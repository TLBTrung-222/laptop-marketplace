import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { AccountService } from 'src/api/account/service/account.service'

// attach account's infor to req.account (by accountId from req.session)
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private accountService: AccountService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>()
        console.log(request.session)
        // kick account if no accountId founded (i.e user not logged in)
        if (!request.session.accountId) return false

        const account = await this.accountService.findById(
            request.session.accountId
        )
        request.account = account
        return !!account
    }
}
