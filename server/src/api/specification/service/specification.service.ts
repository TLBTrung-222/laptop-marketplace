import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SpecificationEntity } from 'src/database/entities/specification.entity'
import { Repository } from 'typeorm'
import { CreateSpecificationDto } from '../dto/specification.dto'
import { ProductEntity } from 'src/database/entities/product.entity'

@Injectable()
export class SpecificationService {
    constructor(
        @InjectRepository(SpecificationEntity)
        private specificationRepository: Repository<SpecificationEntity>,

        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) {}
    // Lấy tất cả thông tin đặc tả
    async findAll(): Promise<SpecificationEntity[]> {
        return this.specificationRepository.find({
            relations: ['productId']
        })
    }

    async findById(productId: number) {
        const product = await this.productRepository.findOne({
            where: { id: productId }
        })
        if (!product) throw new NotFoundException('Product not found')
        const specification = await this.specificationRepository.findOne({
            where: { product },
            relations: {
                product: true
            }
        })
        return specification
    }

    // Tạo thông tin đặc tả mới
    async create(id: number, specificationData: CreateSpecificationDto) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: { specification: true }
        })
        if (!product) throw new NotFoundException('Product not found')

        // if product already have spec, use update
        if (product.specification)
            throw new BadRequestException(
                'Product already have specification, use update instead'
            )

        const specification = this.specificationRepository.create({
            ...specificationData,
            product
        })
        return this.specificationRepository.save(specification)
    }

    async update(id: number, updateData: Partial<CreateSpecificationDto>) {
        const specification = await this.specificationRepository.findOneBy({
            id
        })
        if (!specification) {
            throw new NotFoundException('Specification not found')
        }

        Object.assign(specification, updateData)
        return this.specificationRepository.save(specification)
    }

    // Xóa thông tin đặc tả theo ID
    async remove(id: number) {
        const specification = this.specificationRepository.findOneBy({ id })
        if (!specification) {
            throw new NotFoundException('Specification not found')
        }
        return this.specificationRepository.delete(id)
    }
}
