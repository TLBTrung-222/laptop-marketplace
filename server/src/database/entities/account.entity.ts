// define account entity here

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import { RoleEntity } from './role.entity'
import { RatingEntity } from './rating.entity'
import { ApprovalEntity } from './approval.entity'

@Entity('users')
export class AccountEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
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

    @Column({ type: 'blob', nullable: true })
    avatar: Buffer

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @ManyToOne(() => RoleEntity, (role) => role.accounts)
    @JoinColumn({ name: 'roleId' }) // Specifies the column that will be used as the foreign key in the AccountEntity table.
    role: RoleEntity

    @OneToMany(() => ApprovalEntity, (approval) => approval.seller)
    approvals: ApprovalEntity[]

    @OneToMany(() => RatingEntity, (rating) => rating.buyer)
    ratings: RatingEntity[]
}
