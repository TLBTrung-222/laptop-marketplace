import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from 'src/database/entities/product.entity'
import { Repository } from 'typeorm'
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto'
import { BrandEntity } from 'src/database/entities/brand.entity'
import { AccountEntity } from 'src/database/entities/account.entity'
import { CategoryEntity } from 'src/database/entities/category.entity'
import { ImageEntity } from 'src/database/entities/image.entity'

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
        private imageRepository: Repository<ImageEntity>
    ) {}

    async create(sellerId: number, productDto: CreateProductDto) {
        const brand = await this.brandRepository.findOne({
            where: { id: productDto.brandId }
        })

        const category = await this.categoryRepository.findOne({
            where: { id: productDto.categoryId }
        })

        const seller = await this.accountRepository.findOne({
            where: { id: sellerId }
        })
        if (!category)
            throw new BadRequestException(
                'Category of product could not be found'
            )
        if (!brand)
            throw new BadRequestException('Brand of product could not be found')

        const product = {
            seller: seller,
            brand: brand,
            category: category,
            name: productDto.name,
            price: productDto.price,
            description: productDto.description,
            stockQuantity: productDto.stockQuantity,
            status: productDto.status
        }
        const newProduct = this.productRepository.create(product)
        return await this.productRepository.save(newProduct)
    }

    findAll() {
        return this.productRepository.find({
            relations: {
                seller: true,
                brand: true,
                category: true,
                ratings: {
                    buyerId: true
                }
            }
        })
    }

    async findById(id: number) {
        const existProduct = await this.productRepository.findOne({
            where: { id: id },
            relations: {
                seller: true,
                brand: true,
                category: true,
                ratings: {
                    buyerId: true
                }
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

    async getImage(id: number) {
        const existProduct = await this.productRepository.findOne({
            where: { id: id },
            relations: {
                imageId: true
            }
        })
        if (!existProduct)
            throw new NotFoundException('Product could not been found')
        console.log(existProduct)
        return existProduct
    }

    async uploadImage(id: number, image: Buffer) {
        const existProduct = await this.productRepository.findOne({
            where: { id: id },
            relations: {
                imageId: true
            }
        })
        if (!existProduct)
            throw new NotFoundException('Product could not been found')
        const newImage = this.imageRepository.create({
            image: image,
            productId: existProduct
        })
        await this.imageRepository.save(newImage)
        return existProduct
    }

    async deleteImage(id: number, imageId: number) {
        const existProduct = await this.productRepository.findOne({
            where: { id: id },
            relations: {
                imageId: true
            }
        })
        if (!existProduct)
            throw new NotFoundException('Product could not been found')
        const image = await this.imageRepository.findOne({
            where: { id: imageId, productId: existProduct.imageId }
        })
        if (!image) throw new NotFoundException('Image could not been found')
        await this.imageRepository.delete(imageId)
        return existProduct
    }
}
