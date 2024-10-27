import {
    Body,
    Controller,
    Get,
    Param,
    Put,
    Session,
    UnauthorizedException
} from '@nestjs/common'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { CurrentAccount } from 'src/shared/decorator/current-account.decorator'
import { RoleId } from 'src/shared/enum/role.enum'
import { AccountService } from '../service/account.service'
import { Serialize } from 'src/shared/interceptor/serialize.interceptor'
import { UpdateAccountDto, ViewAccountDto } from '../dto/account.dto'
import { Session as ExpressSession } from 'express-session'

@Serialize(ViewAccountDto)
@Controller('accounts')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Get()
    getAllAccount() {
        return 'return all users'
    }

    @Auth([RoleId.Buyer, RoleId.Seller, RoleId.Admin])
    @Get('profile')
    getCurrentAccountProfile(@CurrentAccount() account: AccountEntity) {
        return this.accountService.findById(account.id)
    }

    @Auth([RoleId.Buyer, RoleId.Seller, RoleId.Admin])
    @Put(':id')
    updateCurrentAccountProfile(
        @Body() body: UpdateAccountDto,
        @Param('id') id: string,
        @Session() session: ExpressSession
    ) {
        // make sure the account's id is match with the target id
        const userId = session.accountId
        if (userId !== parseInt(id))
            throw new UnauthorizedException(
                'You can only update your own profile'
            )

        return this.accountService.update(parseInt(id), body)
    }
}
