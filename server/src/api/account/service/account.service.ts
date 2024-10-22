import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity, UserType } from 'src/database/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(UserEntity) private repo: Repository<UserEntity>
    ) {}

    async create(
        email: string,
        passwordHash: string,
        phoneNumber: string,
        name: string,
        avatar: Buffer,
        type: UserType
    ) {
        const newUser = this.repo.create({
            email,
            passwordHash,
            phoneNumber,
            name,
            avatar,
            type
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
