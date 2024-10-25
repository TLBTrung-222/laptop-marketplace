// define user entity here

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { RoleEntity } from './role.entity'
import { RoleId } from 'src/api/role/enum/role.enum'

@Entity('users')
export class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    phoneNumber: string

    @Column()
    passwordHash: string

    @Column()
    name: string

    @ManyToOne(() => RoleEntity, (role) => role.accounts)
    @JoinColumn({ name: 'roleId' }) // prevent TypeOrm to created column 'roleIdId'
    roleId: RoleId

    // avatar
    @Column({ type: 'blob', nullable: true })
    avatar: Buffer
}
