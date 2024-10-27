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
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'

@ApiTags('accounts')
@ApiUnauthorizedResponse({ description: 'Account is not logged in' })
@ApiForbiddenResponse({
    description: 'Access to the requested account is forbidden'
})
@Serialize(ViewAccountDto)
@Controller('accounts')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @ApiOperation({ summary: 'Get all accounts infor (admin only)' })
    @ApiOkResponse({
        description: 'All account returned succesfully',
        isArray: true,
        type: ViewAccountDto
    })
    @Auth([RoleId.Admin])
    @Get()
    getAllAccount() {
        return this.accountService.findAll()
    }

    @ApiOperation({ summary: 'Get profile of current account' })
    @ApiOkResponse({
        description: 'The profile returned succesfully',
        type: ViewAccountDto
    })
    @Auth([RoleId.Buyer, RoleId.Seller, RoleId.Admin])
    @Get('profile')
    getCurrentAccountProfile(@CurrentAccount() account: AccountEntity) {
        return this.accountService.findById(account.id)
    }

    @ApiOperation({ summary: 'Update profile of current account' })
    @ApiOkResponse({ description: 'Update account information succesfully' })
    @Auth([RoleId.Buyer, RoleId.Seller, RoleId.Admin])
    @Put(':id')
    updateCurrentAccountProfile(
        @Body() body: UpdateAccountDto,
        @Param('id') id: string,
        @Session() session: ExpressSession
    ) {
        // make sure the account's id is match with the target id
        const accountId = session.accountId
        if (accountId !== parseInt(id))
            throw new UnauthorizedException(
                'You can only update your own profile'
            )

        return this.accountService.update(parseInt(id), body)
    }
}
