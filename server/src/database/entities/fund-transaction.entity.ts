import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import { FundEntity } from './fund.entity'
import { OrderEntity } from './order.entity'
import { FundTransactionStatus } from '../../shared/enum/fund-transaction.enum'

@Entity('fund_transactions')
export class FundTransactionEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    transactionId: number

    @Column({ type: 'numeric' })
    creditAmount: number

    @Column({ enum: FundTransactionStatus })
    creditStatus: FundTransactionStatus

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @ManyToOne(() => FundEntity, (fund) => fund.fundTransaction)
    @JoinColumn({ name: 'fundId' })
    fund: FundEntity

    @ManyToOne(() => OrderEntity, (order) => order.fundTransactions)
    @JoinColumn({ name: 'orderId' })
    order: OrderEntity
}
