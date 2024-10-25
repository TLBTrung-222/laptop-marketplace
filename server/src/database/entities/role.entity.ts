import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { AccountEntity } from './account.entity'
import { IsEnum } from 'class-validator'
import { RoleId } from 'src/api/role/enum/role.enum'

@Entity('roles')
export class RoleEntity {
    @PrimaryColumn()
    @IsEnum(RoleId, { message: 'role id must be 0, 1, or 2' })
    id: RoleId

    @Column()
    role_name: string

    @OneToMany(() => AccountEntity, (account) => account.roleId)
    accounts: AccountEntity[]
}
