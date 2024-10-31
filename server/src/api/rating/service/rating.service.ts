import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RatingEntity } from "src/database/entities/rating.entity";
import { Repository } from "typeorm";
import { CreateRatingDto } from "../dto/rating.dto";
import { ProductEntity } from "src/database/entities/product.entity";
import { AccountEntity } from "src/database/entities/account.entity";

@Injectable()
export class RatingService{
    constructor(
        @InjectRepository(RatingEntity)
        private ratingRepository: Repository<RatingEntity>,
        
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,

        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>
    ){}

    async create(buyerId: number, rating: CreateRatingDto){
        const product = await this.productRepository.findOne({where:{id:rating.product_id}})
        const buyer = await this.accountRepository.findOne({where:{id:buyerId}})

        if (!product||!buyer) throw new NotFoundException('Its product or buyer not found')
        
        const newRating = this.ratingRepository.create({
            product: product,
            buyer: buyer,
            rating_star: rating.rating_star,
            comment: rating.comment,
        });
        return this.ratingRepository.save(newRating)
    }

    findAll(){
        return this.ratingRepository.find({relations:{buyer:true}})
    }

    async findById(id: number){
        const exist = await this.ratingRepository.findOne({
            where: {id:id},
            relations:{buyer:true}
        })
        if (!exist){
            throw new NotFoundException('Rating could not been found')
        }
        return exist
    }

    async update(id:number, buyerId:number, ratingDto:any){
        const rating = await this.ratingRepository.findOne({
            where:{id:id},
            relations:{
                buyer: true
            }
        })
        if (!rating){
            throw new NotFoundException('Rating could not be found')
        }
        const update = Object.assign(rating, ratingDto)
        return this.ratingRepository.save(update)
    }

    async delete(id:number){
        const exist = await this.ratingRepository.find({where:{id:id}})
        if (!exist)
            throw new NotFoundException('Rating could not be found')
        return await this.ratingRepository.delete({id:id})
    }
}