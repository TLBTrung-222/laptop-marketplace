import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { AccountService } from './account.service'
import { SignUpUserDto } from '../dto/user.dto'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { UserType } from 'src/database/entities/user.entity'
import { readFileSync } from 'fs'
import { join } from 'path'
import { LoginUserDto } from '../dto/user.dto'

const SALT_SIZE = 8 // 8 bytes or 16 hex character string
const HASH_SIZE = 32 // 32 bytes

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private accountService: AccountService) {}

    async #hashPassword(password: string) {
        // create hash password
        const salt = randomBytes(SALT_SIZE).toString('hex')
        const hashBuffer = (await scrypt(password, salt, HASH_SIZE)) as Buffer
        const passwordHash = hashBuffer.toString('hex')
        return salt + '.' + passwordHash
    }

    async #comparePassword(rawPassword: string, hashPassword: string) {
        const [salt, hash] = hashPassword.split('.')
        const checkHashBuffer = (await scrypt(
            rawPassword,
            salt,
            HASH_SIZE
        )) as Buffer

        return checkHashBuffer.toString('hex') === hash
    }

    async signIn(user: LoginUserDto) {
        const existUser = await this.accountService.findByEmail(user.email)
        if (!existUser) throw new NotFoundException('Email not founded')
        const isPasswordValid = await this.#comparePassword(
            user.password,
            existUser.passwordHash
        )
        if (!isPasswordValid) throw new UnauthorizedException('Wrong password')
        return existUser
    }

    async signUp(user: SignUpUserDto) {
        const existUser = await this.accountService.findByEmail(user.email)
        if (existUser) throw new BadRequestException('Email already in used')

        // hash password
        const passwordHash = await this.#hashPassword(user.password)

        // attach role (default is buyer)
        const role = UserType.BUYER

        // attach defaut avatar
        user.avatar = Boolean(user.avatar)
            ? user.avatar
            : readFileSync(
                  join(process.cwd(), 'src', 'public', 'default_user.jpg')
              )

        // register to db
        const newUser = await this.accountService.create(
            user.email,
            passwordHash,
            user.phoneNumber,
            user.name,
            user.avatar,
            role
        )

        return newUser
    }
}
