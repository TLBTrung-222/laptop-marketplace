import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { AccountEntity } from './account.entity'
import { FundTransactionEntity } from './fund-transaction.entity'

@Entity('funds')
export class FundEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    fundId: number

    @Column()
    balance: number

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @OneToOne(() => AccountEntity, (account) => account.fund)
    @JoinColumn({ name: 'sellerId' })
    seller: AccountEntity

    @OneToMany(
        () => FundTransactionEntity,
        (fundTransaction) => fundTransaction.fund
    )
    fundTransaction: FundTransactionEntity
}
