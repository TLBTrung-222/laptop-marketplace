import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleId } from 'src/api/role/enum/role.enum'
import { AccountEntity } from 'src/database/entities/account.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity) private repo: Repository<AccountEntity>
    ) {}

    async create(
        email: string,
        passwordHash: string,
        phoneNumber: string,
        name: string,
        avatar: Buffer,
        roleId: RoleId
    ) {
        const newUser = this.repo.create({
            email,
            passwordHash,
            phoneNumber,
            name,
            avatar,
            roleId
        })

        return this.repo.save(newUser)
    }

    findById(id: number) {
        return this.repo.findOne({ where: { id } })
    }

    findByEmail(email: string) {
        return this.repo.findOne({ where: { email } })
    }
}
