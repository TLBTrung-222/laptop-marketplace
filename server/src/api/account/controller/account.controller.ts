import { Controller, Get, Param, Put } from '@nestjs/common'

@Controller('accounts')
export class AccountController {
    @Get()
    getAllUser() {
        return 'return all users'
    }

    @Get('profile')
    getCurrentUserProfile() {
        return 'profile of this user'
    }

    @Get(':id')
    getUserWithId(@Param('id') id: string) {
        return 'find user with id: ' + id
    }

    @Put(':id')
    updateCurrentUserProfile() {
        return `update user's profile`
    }
}
