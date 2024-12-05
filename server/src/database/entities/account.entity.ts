// define account entity here

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { RoleEntity } from './role.entity'
import { RatingEntity } from './rating.entity'
import { ApprovalEntity } from './approval.entity'
import { CartEntity } from './cart.entity'
import { OrderEntity } from './order.entity'
import { FundEntity } from './fund.entity'

@Entity('accounts')
export class AccountEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column({ nullable: true })
    phoneNumber: string

    @Column({ nullable: true })
    passwordHash: string

    @Column()
    name: string

    @Column({ nullable: true })
    avatar?: string

    @Column({ nullable: true })
    googleId?: string

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @ManyToOne(() => RoleEntity, (role) => role.accounts, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'roleId' }) // Specifies the column that will be used as the foreign key in the AccountEntity table.
    role: RoleEntity

    @OneToMany(() => ApprovalEntity, (approval) => approval.seller)
    approvals: ApprovalEntity[]

    @OneToMany(() => RatingEntity, (rating) => rating.buyer)
    ratings: RatingEntity[]

    @OneToOne(() => CartEntity, (cart) => cart.buyer, { onDelete: 'CASCADE' })
    cart: CartEntity

    @OneToMany(() => OrderEntity, (order) => order.buyer)
    orders: OrderEntity[]

    @OneToOne(() => FundEntity, (fund) => fund.seller)
    fund: FundEntity
}
