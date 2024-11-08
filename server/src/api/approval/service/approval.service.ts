import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { ApprovalEntity } from 'src/database/entities/approval.entity'
import { ProductEntity } from 'src/database/entities/product.entity'
import { ApprovalStatus } from 'src/shared/enum/approval.enum'
import { Repository } from 'typeorm'

@Injectable()
export class ApprovalService {
    constructor(
        @InjectRepository(ApprovalEntity)
        private approvalRepository: Repository<ApprovalEntity>,
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) {}

    async findApprovalsFromSeller(sellerId: number) {
        const existSeller = await this.accountRepository.findBy({
            id: sellerId
        })
        if (!existSeller)
            throw new NotFoundException('Not found seller with given id')

        return this.approvalRepository.find({
            relations: {
                product: true
            }
        })
    }

    async deleteApproval(approvalId: number, sellerId: number) {
        // make sure seller who call this func is the owner of this approval
        const approval = await this.approvalRepository.findOne({
            where: { id: approvalId },
            relations: {
                seller: true,
                product: true
            }
        })

        if (!approval)
            throw new BadRequestException('Can not find approval with given id')

        if (sellerId !== approval.seller.id)
            throw new UnauthorizedException(
                'You can only delete your own approval'
            )

        // the approval status must 'pending'
        if (approval.approvalStatus !== ApprovalStatus.PENDING)
            throw new ForbiddenException('Can not delete not-pending approval')

        // manually delete the product
        await this.productRepository.delete({ id: approval.product.id })
        return this.approvalRepository.remove(approval)
    }
}
