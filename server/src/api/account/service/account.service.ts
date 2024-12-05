import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleId } from 'src/shared/enum/role.enum'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Repository } from 'typeorm'
import { SignUpAccountDto, UpdateAccountDto } from '../dto/account.dto'
import { RoleEntity } from 'src/database/entities/role.entity'
import { FundEntity } from 'src/database/entities/fund.entity'
import { readFileSync } from 'fs'
import { join } from 'path'

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
        @InjectRepository(FundEntity)
        private fundRepository: Repository<FundEntity>
    ) {}

    async create(body: SignUpAccountDto, roleId: number) {
        const role = await this.roleRepository.findOne({
            where: { id: roleId }
        })

        const newUser = this.accountRepository.create({
            ...body,
            passwordHash: body.password,
            role
        })

        const savedUser = await this.accountRepository.save(newUser)
        // if new user is seller, need to create fund entity
        if (roleId === RoleId.Seller) {
            const newFund = this.fundRepository.create({
                balance: 0,
                seller: savedUser
            })
            await this.fundRepository.save(newFund)
        }
        return savedUser
    }

    findAll() {
        return this.accountRepository.find()
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
        return this.accountRepository.findOne({ where: { email } })
    }

    async update(id: number, body: UpdateAccountDto) {
        const user = await this.findById(id)

        if (!user)
            throw new NotFoundException(`Can not find user with id: ${id}`)

        Object.assign(user, body)
        return await this.accountRepository.save(user)
    }

    async uploadAvatar(account: AccountEntity, file: Express.Multer.File) {
        const filePath = join('/assets', 'avatars', file.filename)
        account.avatar = filePath
        await this.accountRepository.save(account)
        return { filePath }
    }

    async getAvatar(account: AccountEntity) {
        if (!account.avatar) return null

        let data: Buffer
        try {
            data = readFileSync(
                join(__dirname, '..', '..', '..', account.avatar)
            )
        } catch (error) {
            throw new NotFoundException('The avatar can not be founded')
        }
        return data
    }
}
