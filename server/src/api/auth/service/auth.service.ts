import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { readFileSync } from 'fs'
import { join } from 'path'
import { AccountService } from 'src/api/account/service/account.service'
import { RoleId } from 'src/shared/enum/role.enum'
import {
    LoginAccountDto,
    SignUpAccountDto
} from 'src/api/account/dto/account.dto'

const SALT_SIZE = 8 // 8 bytes or 16 hex character string
const HASH_SIZE = 32 // 32 bytes

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private accountService: AccountService) {}

    async hashPassword(password: string) {
        // create hash password
        const salt = randomBytes(SALT_SIZE).toString('hex')
        const hashBuffer = (await scrypt(password, salt, HASH_SIZE)) as Buffer
        const passwordHash = hashBuffer.toString('hex')
        return salt + '.' + passwordHash
    }

    async comparePassword(rawPassword: string, hashPassword: string) {
        const [salt, hash] = hashPassword.split('.')
        const checkHashBuffer = (await scrypt(
            rawPassword,
            salt,
            HASH_SIZE
        )) as Buffer

        return checkHashBuffer.toString('hex') === hash
    }

    async signIn(account: LoginAccountDto) {
        const existUser = await this.accountService.findByEmail(account.email)
        if (!existUser) throw new NotFoundException('Email not founded')
        const isPasswordValid = await this.comparePassword(
            account.password,
            existUser.passwordHash
        )
        if (!isPasswordValid) throw new UnauthorizedException('Wrong password')
        return existUser
    }

    async signUp(account: SignUpAccountDto, roleId: RoleId) {
        const existUser = await this.accountService.findByEmail(account.email)
        if (existUser) throw new BadRequestException('Email already in used')

        // hash password
        const passwordHash = await this.hashPassword(account.password)

        // attach defaut avatar
        account.avatar = Boolean(account.avatar)
            ? account.avatar
            : readFileSync(
                  join(process.cwd(), 'src', 'public', 'default_user.jpg')
              )

        // register to db
        const newUser = await this.accountService.create(
            {
                ...account,
                password: passwordHash
            },
            roleId
        )

        return newUser
    }
}
