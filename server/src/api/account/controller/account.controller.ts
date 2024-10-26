import { Controller, Get, Put } from '@nestjs/common'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { CurrentAccount } from 'src/shared/decorator/current-account.decorator'
import { RoleId } from 'src/shared/enum/role.enum'

@Controller('accounts')
export class AccountController {
    @Get()
    getAllAccount() {
        return 'return all users'
    }

    @Auth([RoleId.Buyer])
    @Get('profile')
    getCurrentAccountProfile(@CurrentAccount() account: AccountEntity) {
        return 'profile of account: ' + account.id
    }

    @Put(':id')
    updateCurrentAccountProfile() {
        return `update account's profile`
    }
}
