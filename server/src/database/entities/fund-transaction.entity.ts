import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { FundEntity } from './fund.entity'
import { OrderEntity } from './order.entity'

@Entity('fund_transactions')
export class FundTransactionEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    transactionId: number

    @Column({ type: 'numeric' })
    creditAmount: number

    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @ManyToOne(() => FundEntity, (fund) => fund.fundTransaction)
    @JoinColumn({ name: 'fundId' })
    fund: FundEntity

    @OneToOne(() => OrderEntity, (order) => order.fundTransaction)
    @JoinColumn({ name: 'orderId' })
    order: OrderEntity
}
