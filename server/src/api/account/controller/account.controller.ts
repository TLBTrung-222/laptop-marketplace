import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Session,
    UnauthorizedException,
    UnsupportedMediaTypeException,
    UploadedFile,
    UseInterceptors
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
    ApiCookieAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@ApiTags('accounts')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Account is not logged in' })
@ApiForbiddenResponse({
    description: 'Access to the requested endpoint is forbidden'
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
        return account
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

    @Auth([RoleId.Buyer, RoleId.Seller, RoleId.Admin])
    @Post('avatar')
    @UseInterceptors(
        FileInterceptor('avatar', {
            fileFilter: (req, file, callback) => {
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
                if (!allowedTypes.includes(file.mimetype)) {
                    return callback(
                        new UnsupportedMediaTypeException(
                            'Only images are allowed'
                        ),
                        false
                    )
                }
                callback(null, true)
            }
        })
    )
    async uploadAvatar(
        @UploadedFile() file: Express.Multer.File,
        @CurrentAccount() account: AccountEntity
    ) {
        if (!file) throw new BadRequestException('No file uploaded')
        return this.accountService.uploadAvatar(account, file)
    }

    @Auth([RoleId.Buyer, RoleId.Seller, RoleId.Admin])
    @Get('avatar')
    getAvatar(@CurrentAccount() account: AccountEntity) {
        return this.accountService.getAvatar(account)
    }

    @Auth([RoleId.Buyer, RoleId.Seller, RoleId.Admin])
    @Delete('avatar')
    deleteAvatar(@CurrentAccount() account: AccountEntity) {
        return this.accountService.deleteAvatar(account)
    }
}
