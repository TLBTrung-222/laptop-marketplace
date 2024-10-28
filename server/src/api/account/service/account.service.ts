import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleId } from 'src/shared/enum/role.enum'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Repository } from 'typeorm'
import { SignUpAccountDto, UpdateAccountDto } from '../dto/account.dto'
import { RoleEntity } from 'src/database/entities/role.entity'

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>
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

        return this.accountRepository.save(newUser)
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
}
