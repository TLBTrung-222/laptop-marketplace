import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/database/entities/product.entity";
import { Repository } from "typeorm";
import { createProductDto, updateProductDto } from "../dto/product.dto";
import { BrandEntity } from "src/database/entities/brand.entity";
import { AccountEntity } from "src/database/entities/account.entity";
import { CategoryEntity } from "src/database/entities/category.entity";

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
        private categoryRepository: Repository<CategoryEntity>
    ) {}

    async create(sellerId: number, productDto: createProductDto) {
        const brand = await this.brandRepository.findOne({
            where: { id: productDto.brand }
        })

        const category = await this.categoryRepository.findOne({
            where: { id: productDto.category }
        })

        const seller = await this.accountRepository.findOne({where:{id:sellerId}})
        if (!category)
            throw new BadRequestException('Category of product could not be found')
        if (!brand)
            throw new BadRequestException('Brand of product could not be found')
        console.log(category)
            const product={
            seller: seller,
            brand: brand,
            category: category,
            name: productDto.name,
            price: productDto.price,
            description: productDto.description,
            stock_quantity: productDto.stock_quantity,
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
                category: true
            }
        })
    }

    findById(id: number) {
        const exist = this.productRepository.find({
            where: { id: id },
            relations: {
                seller: true,
                brand: true,
                category: true
            }
        })

        if (!exist) throw new NotFoundException('Product could not been found')
        return exist
    }

    async update(id: number, sellerId: number, productDto: updateProductDto) {
        const exist = await this.productRepository.findOne({
            where: { id: id }
        })
        if (!exist) throw new BadRequestException('Product could not be found')
        const product = new ProductEntity()
        if (productDto.brand) {
            const brand = await this.brandRepository.findOne({
                where: { id: productDto.brand }
            })
            if (!brand)
                throw new BadRequestException('Update brand could not be found')
            product.brand = brand
        }
        if (productDto.category) {
            const category = await this.categoryRepository.findOne({
                where: { id: productDto.category }
            })
            if (category) {
                throw new BadRequestException(
                    'Update category could not be found'
                )
            }
            product.category = category
        }
        
        if(productDto.description) product.description = productDto.description
        if(productDto.name) product.name = productDto.name
        if(productDto.price) product.price = productDto.price
        if(productDto.stock_quantity) product.stock_quantity = productDto.stock_quantity
        if(productDto.status) product.status = productDto.status

        Object.assign(exist,product)
        return await this.productRepository.save(exist)
    }

    async delete(id: number) {
        const exist = this.productRepository.findOne({
            where: { id: id }
        })

        if (!exist) throw new NotFoundException('Product could not been found')
        return this.productRepository.delete(id)
    }
}