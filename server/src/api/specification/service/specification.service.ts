import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { SpecificationEntity } from "src/database/entities/specification.entity"
import { Repository } from "typeorm"
import { CreateSpecificationDto, UpdateSpecificationDto } from "../dto/specification.dto"
import { ProductEntity } from "src/database/entities/product.entity"

@Injectable()
export class SpecificationService {

    constructor(
        @InjectRepository(SpecificationEntity)
        private specificationRepository: Repository<SpecificationEntity>,

        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
    ) {}
    // Lấy tất cả thông tin đặc tả
    async findAll(): Promise<SpecificationEntity[]> {
        return this.specificationRepository.find({
            relations: ['productId']
        })
    }

    async findById(id: number){
        const productId = await this.productRepository.findOne({
            where:{id: id},
            relations:{
                specificationId:true
            }
        })
        const specification = await this.specificationRepository.findOne({
            where: { id:productId.specificationId.id},
            relations: {
                productId:true
            }
        })
        return specification
    }

    // Tạo thông tin đặc tả mới
    async create(id: number, specificationData: CreateSpecificationDto){
        const product = await this.productRepository.findOne({where: {id: id}})
        if (!product) throw new NotFoundException('Product not found');
        const specification = this.specificationRepository.create({...specificationData, productId:product});
        console.log(specification);
        return await this.specificationRepository.save(specification)
    }

    async update(
        id: number,
        updateData: UpdateSpecificationDto
    ){
        const specification = this.specificationRepository.findOneById(id)
        if (!specification) {
            throw new NotFoundException('Specification not found')
        }
        await this.specificationRepository.update(id, updateData)
        return this.findById(id)
    }

    // Xóa thông tin đặc tả theo ID
    async remove(id: number): Promise<void> {
        const specification = this.specificationRepository.findOneById(id)
        if (!specification) {
            throw new NotFoundException('Specification not found')
        }
        await this.specificationRepository.delete(id)
    }
}
