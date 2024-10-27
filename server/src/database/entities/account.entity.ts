// define account entity here

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { RoleEntity } from './role.entity'
import { RoleId } from 'src/shared/enum/role.enum'

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
    @JoinColumn({ name: 'roleId' }) // Specifies the column that will be used as the foreign key in the AccountEntity table.
    role: RoleEntity

    @Column({ nullable: false })
    roleId: RoleId // Explicitly define the foreign key column

    // avatar
    @Column({ type: 'blob', nullable: true })
    avatar: Buffer
}
