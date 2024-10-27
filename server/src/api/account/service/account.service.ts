import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleId } from 'src/shared/enum/role.enum'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Repository } from 'typeorm'
import { SignUpAccountDto, UpdateAccountDto } from '../dto/account.dto'

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>
    ) {}

    async create(body: SignUpAccountDto, roleId: number) {
        const newUser = this.accountRepository.create({
            ...body,
            roleId
        })

        return this.accountRepository.save(newUser)
    }

    findById(id: number) {
        return this.accountRepository.findOne({ where: { id } })
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
