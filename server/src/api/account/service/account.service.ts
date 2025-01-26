import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleId } from 'src/shared/enum/role.enum'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Repository } from 'typeorm'
import { SignUpAccountDto, UpdateAccountDto } from '../dto/account.dto'
import { RoleEntity } from 'src/database/entities/role.entity'
import { FundEntity } from 'src/database/entities/fund.entity'
import { readFileSync } from 'fs'
import { resolveAssetPath } from 'src/shared/utils/helper'
import { rm } from 'fs/promises'
import { S3Service } from 'src/api/s3/service/s3.service'
import { extname } from 'path'

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
        @InjectRepository(FundEntity)
        private fundRepository: Repository<FundEntity>,
        private s3Service: S3Service
    ) {}

    async create(body: SignUpAccountDto, roleId: number) {
        const role = await this.roleRepository.findOne({
            where: { id: roleId }
        })

        const newAccount = this.accountRepository.create({
            ...body,
            passwordHash: body.password,
            role
        })

        const savedAccount = await this.accountRepository.save(newAccount)
        // if new user is seller, need to create fund entity
        if (roleId === RoleId.Seller) {
            const newFund = this.fundRepository.create({
                balance: 0,
                seller: savedAccount
            })
            await this.fundRepository.save(newFund)
        }
        return savedAccount
    }

    findAll() {
        return this.accountRepository.find({ relations: { role: true } })
    }

    findById(id: number) {
        return this.accountRepository.findOne({
            where: { id },
            relations: {
                role: true
            }
        })
    }

    findByEmail(email: string) {
        return this.accountRepository.findOne({
            where: { email },
            relations: { role: true }
        })
    }

    async update(id: number, body: UpdateAccountDto) {
        const user = await this.findById(id)

        if (!user)
            throw new NotFoundException(`Can not find user with id: ${id}`)

        Object.assign(user, body)
        return await this.accountRepository.save(user)
    }

    async uploadAvatar(account: AccountEntity, file: Express.Multer.File) {
        // delete user's avatar if any
        if (account.avatar) {
            await this.deleteAvatar(account)
        }

        const key = `${account.id}${extname(file.originalname)}`
        const s3Key = await this.s3Service.uploadImage(
            'avatars',
            key,
            file.buffer,
            file.mimetype
        )
        account.avatar = s3Key
        await this.accountRepository.save(account)

        return s3Key
    }

    async getAvatar(account: AccountEntity) {
        if (!account.avatar) return null
        return this.s3Service.getImageSignedUrl(account.avatar)
    }

    async getAccountProfile(accountId: number) {
        return this.accountRepository.findOne({
            where: { id: accountId },
            relations: { role: true }
        })
    }

    async deleteAvatar(account: AccountEntity) {
        if (!account.avatar)
            throw new BadRequestException('User do not have avatar')

        await this.s3Service.deleteImage(account.avatar)
        account.avatar = null
        return this.accountRepository.save(account)
    }
}
