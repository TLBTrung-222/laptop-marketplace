import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RatingEntity } from 'src/database/entities/rating.entity'
import { Repository } from 'typeorm'
import { CreateRatingDto, UpdateRatingDto } from '../dto/rating.dto'
import { ProductEntity } from 'src/database/entities/product.entity'
import { AccountEntity } from 'src/database/entities/account.entity'

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(RatingEntity)
        private ratingRepository: Repository<RatingEntity>,

        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,

        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>
    ) {}

    async findAll() {
        return this.ratingRepository.find()
    }

    async findByProductId(productId: number) {
        // validate product id
        const existProduct = await this.productRepository.findOne({
            where: { id: productId },
            relations: {
                ratings: true
            }
        })
        if (!existProduct)
            throw new NotFoundException(
                `Can not find product with id: ${productId}`
            )

        return this.ratingRepository.find({
            where: { product: existProduct },
            relations: {
                buyerId: true,
                product: true
            }
        })
    }

    async create(product_id: number, buyerId: number, rating: CreateRatingDto) {
        const product = await this.productRepository.findOne({
            where: { id: product_id }
        })
        if (!product)
            throw new NotFoundException(
                `Can not find product with id: ${product_id}`
            )

        const buyer = await this.accountRepository.findOne({
            where: { id: buyerId }
        })

        if (!buyer)
            throw new NotFoundException(
                `Can not find buyer with id: ${buyerId}`
            )

        const newRating = this.ratingRepository.create({
            product: product,
            buyerId: buyer,
            ratingStar: rating.ratingStar,
            comment: rating.comment
        })
        return this.ratingRepository.save(newRating)
    }

    async findById(id: number) {
        const exist = await this.ratingRepository.findOne({
            where: { id: id },
            relations: { buyerId: true }
        })
        if (!exist) {
            throw new NotFoundException('Rating could not been found')
        }
        return exist
    }

    async update(id: number, ratingDto: UpdateRatingDto) {
        const rating = await this.ratingRepository.findOne({
            where: { id: id }
        })
        if (!rating) {
            throw new NotFoundException('Rating could not be found')
        }
        Object.assign(rating, ratingDto)
        return this.ratingRepository.save(rating)
    }

    async delete(id: number) {
        const rating = await this.ratingRepository.find({ where: { id: id } })
        if (!rating) throw new NotFoundException('Rating could not be found')
        return await this.ratingRepository.delete({ id: id })
    }
}
