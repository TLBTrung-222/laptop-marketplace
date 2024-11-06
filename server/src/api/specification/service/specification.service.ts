import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { SpecificationEntity } from "src/database/entities/specification.entity"
import { Repository } from "typeorm"
import { CreateSpecificationDto, UpdateSpecificationDto } from "../dto/specification.dto"

@Injectable()
export class SpecificationService {

    constructor(
        @InjectRepository(SpecificationEntity)
        private specificationRepository: Repository<SpecificationEntity>,
    ) {}
    // Lấy tất cả thông tin đặc tả
    async findAll(): Promise<SpecificationEntity[]> {
        return this.specificationRepository.find({
            relations: ['productId']
        })
    }

    async findById(id: number){
        const specification = await this.specificationRepository.findOne({
            where: { id:id },
            relations: ['productId']
        })
        return specification
    }

    // Tạo thông tin đặc tả mới
    async create(specificationData: CreateSpecificationDto): Promise<SpecificationEntity> {
        const specification = this.specificationRepository.create(specificationData)
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
