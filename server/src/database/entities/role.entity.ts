import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { AccountEntity } from './account.entity'
import { IsEnum } from 'class-validator'
import { RoleId } from '../../shared/enum/role.enum'
import { ProductEntity } from './product.entity'

@Entity('roles')
export class RoleEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryColumn()
    @IsEnum(RoleId, { message: 'role id must be 0, 1, or 2' })
    id: RoleId

    @Column()
    roleName: string

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @OneToMany(() => AccountEntity, (account) => account.role)
    accounts: AccountEntity[]

    @OneToMany(() => ProductEntity, (product) => product.seller)
    products: ProductEntity[]
}
