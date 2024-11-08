import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { AccountEntity } from './account.entity'
import { ProductEntity } from './product.entity'
import { ApprovalStatus } from 'src/shared/enum/approval.enum'

@Entity('approvals')
export class ApprovalEntity {
    /* -------------------------------------------------------------------------- */
    /*                                   Columns                                  */
    /* -------------------------------------------------------------------------- */
    @PrimaryGeneratedColumn()
    id: number

    @Column({ enum: ApprovalStatus, default: ApprovalStatus.PENDING })
    approvalStatus: ApprovalStatus

    @CreateDateColumn()
    submissionDate: Date
    /* -------------------------------------------------------------------------- */
    /*                                  Relations                                 */
    /* -------------------------------------------------------------------------- */
    @ManyToOne(() => AccountEntity, (account) => account.approvals)
    @JoinColumn({ name: 'sellerId' })
    seller: AccountEntity

    @OneToOne(() => ProductEntity, (product) => product.approval, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'productId' })
    product: ProductEntity
}
