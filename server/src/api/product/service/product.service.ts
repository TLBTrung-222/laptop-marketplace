import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from 'src/database/entities/product.entity'
import { Repository } from 'typeorm'
import {
    CreateProductDto,
    SearchProductDto,
    UpdateProductDto
} from '../dto/product.dto'
import { BrandEntity } from 'src/database/entities/brand.entity'
import { AccountEntity } from 'src/database/entities/account.entity'
import { CategoryEntity } from 'src/database/entities/category.entity'
import { ImageEntity } from 'src/database/entities/image.entity'
import { ApprovalEntity } from 'src/database/entities/approval.entity'
import { ApprovalStatus } from 'src/shared/enum/approval.enum'
import { rm } from 'fs/promises'
import { resolveAssetPath } from 'src/shared/utils/helper'
import { EmailService } from 'src/api/email/service/email.service'
import { S3Service } from 'src/api/s3/service/s3.service'
import { randomUUID } from 'crypto'
import { extname } from 'path'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,

        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,

        @InjectRepository(BrandEntity)
        private brandRepository: Repository<BrandEntity>,

        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>,

        @InjectRepository(ImageEntity)
        private imageRepository: Repository<ImageEntity>,

        @InjectRepository(ApprovalEntity)
        private readonly approvalRepository: Repository<ApprovalEntity>,

        private emailService: EmailService,

        private s3Service: S3Service
    ) {}

    async create(
        sellerId: number,
        productDto: CreateProductDto,
        productImages: Array<Express.Multer.File>
    ): Promise<ProductEntity> {
        const seller = await this.accountRepository.findOne({
            where: { id: sellerId }
        })
        const brand = await this.brandRepository.findOne({
            where: { id: productDto.brandId }
        })
        const category = await this.categoryRepository.findOne({
            where: { id: productDto.categoryId }
        })

        if (!category) {
            throw new BadRequestException(
                'Category of product could not be found'
            )
        }
        if (!brand) {
            throw new BadRequestException('Brand of product could not be found')
        }

        // Step 1: Create and save the product + upload images to S3
        const product = this.productRepository.create({
            seller,
            brand,
            category,
            name: productDto.name,
            price: productDto.price,
            description: productDto.description,
            stockQuantity: productDto.stockQuantity,
            status: productDto.status
        })

        const savedProduct = await this.productRepository.save(product)

        for (const image of productImages) {
            await this.uploadImage(savedProduct.id, image)
        }

        // Step 2: Create and save the approval
        const approval = this.approvalRepository.create({
            approvalStatus: ApprovalStatus.PENDING,
            product: savedProduct,
            seller
        })

        await this.approvalRepository.save(approval)

        // Step 3: Attach the saved approval to the product
        savedProduct.approval = approval

        // send email to admin to ask for approval
        await this.emailService.sendApprovalEmail('baotrung2853@gmail.com')

        // Return the product with the attached approval
        return await this.productRepository.save(savedProduct)
    }

    findAll(query: SearchProductDto) {
        const queryBuilder = this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.seller', 'seller')
            .leftJoinAndSelect('product.ratings', 'ratings')
            .leftJoinAndSelect('product.images', 'images')
            .leftJoin('product.approval', 'approvals')

        if (query.brand)
            queryBuilder.andWhere('brand.name = :brand', { brand: query.brand })
        if (query.category)
            queryBuilder.andWhere('category.type = :category', {
                category: query.category
            })

        return queryBuilder
            .andWhere(`approvals.approvalStatus = 'approved'`)
            .getMany()
    }

    async findById(id: number) {
        const existProduct = await this.productRepository.findOne({
            where: { id: id },
            relations: {
                seller: true,
                brand: true,
                category: true,
                ratings: {
                    buyer: true
                },
                approval: true,
                images: true
            }
        })

        if (!existProduct)
            throw new NotFoundException('Product could not been found')
        return existProduct
    }

    async update(
        id: number,
        productDto: Partial<UpdateProductDto>
    ): Promise<ProductEntity> {
        const existProduct = await this.productRepository.findOne({
            where: { id: id },
            relations: ['brand', 'category']
        })

        if (!existProduct) {
            throw new BadRequestException('Product could not be found')
        }

        if (productDto.brandId) {
            const brand = await this.brandRepository.findOne({
                where: { id: productDto.brandId }
            })
            if (!brand) {
                throw new BadRequestException('Update brand could not be found')
            }
            existProduct.brand = brand
        }

        if (productDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: productDto.categoryId }
            })
            if (!category) {
                throw new BadRequestException(
                    'Update category could not be found'
                )
            }
            existProduct.category = category
        }

        Object.assign(existProduct, productDto)

        return this.productRepository.save(existProduct)
    }

    async delete(id: number) {
        const existProduct = await this.productRepository.findOne({
            where: { id: id }
        })
        if (!existProduct)
            throw new NotFoundException('Product could not been found')
        return await this.productRepository.delete(id)
    }

    async getImages(productId: number) {
        const existProduct = await this.productRepository.findOne({
            where: { id: productId },
            relations: {
                images: true
            }
        })
        if (!existProduct)
            throw new NotFoundException('Product could not be found')

        return existProduct.images
    }

    async uploadImage(productId: number, image: Express.Multer.File) {
        /* ---------------------- validate if product is exist ---------------------- */
        const existProduct = await this.productRepository.findOne({
            where: { id: productId },
            relations: {
                images: true
            }
        })
        if (!existProduct)
            throw new NotFoundException('Product could not be found')

        if (existProduct.images.length > 8)
            throw new BadRequestException(
                'The number of product images can not exceed 8'
            )

        /* --------------------- upload product image into S3  ------------------------ */
        const uniqueSuffix = `${Date.now()}-${randomUUID()}` // add some random to prevent key collision
        const key = `${existProduct.id}-${uniqueSuffix}${extname(image.originalname)}`
        const s3Key = await this.s3Service.uploadImage(
            'products',
            key,
            image.buffer,
            image.mimetype
        )
        await this.imageRepository.save({
            image: s3Key,
            product: existProduct
        })

        return s3Key
    }

    async deleteImage(key: string) {
        const existedImage = await this.imageRepository.findOne({
            where: { image: key }
        })
        if (!existedImage)
            throw new NotFoundException('Image could not been found')

        // delete from s3
        await this.s3Service.deleteImage(key)

        // delete from db
        await this.imageRepository.delete(existedImage)

        return {
            deletedImage: key
        }
    }
}
