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

        private emailService: EmailService
    ) {}

    async create(
        sellerId: number,
        productDto: CreateProductDto
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

        // Step 1: Create and save the product first
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
                approval: true
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

        /* --------- loop through each image, read the correspond image.jpg --------- */
        // const imagesWithBuffers = await Promise.all(
        //     existProduct.images.map(async (image) => {
        //         const imagePath = resolveAssetPath(image.image, 'products')
        //         const buffer = await readFile(imagePath)
        //         return {
        //             image,
        //             buffer
        //         }
        //     })
        // )

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

        /* ------------------- save product image into Image repo ------------------- */
        const newImage = this.imageRepository.create({
            image: image.filename,
            product: existProduct
        })
        await this.imageRepository.save(newImage)

        return newImage
    }

    async deleteImage(id: number, imageId: number) {
        const existProduct = await this.productRepository.findOne({
            where: { id: id },
            relations: {
                images: true
            }
        })
        if (!existProduct)
            throw new NotFoundException('Product could not been found')
        const image = await this.imageRepository.findOne({
            where: { id: imageId }
        })
        if (!image) throw new NotFoundException('Image could not been found')

        const imagePath = resolveAssetPath(image.image, 'products')
        await rm(imagePath)

        await this.imageRepository.delete(image)

        return {
            deletedImage: image
        }
    }
}
