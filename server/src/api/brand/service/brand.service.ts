import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BrandEntity } from 'src/database/entities/brand.entity'
import { Repository } from 'typeorm'
import { CreateBrandDto } from '../dto/brand.dto'

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(BrandEntity)
        private brandRepository: Repository<BrandEntity>
    ) {}

    async create(brand: CreateBrandDto) {
        const existBrand = await this.brandRepository.findOne({
            where: { name: brand.name }
        })
        if (existBrand) {
            throw new BadRequestException('Brand already existed')
        }

        const newBrand = this.brandRepository.create(brand)
        return await this.brandRepository.save(newBrand)
    }

    getAllBrands() {
        return this.brandRepository.find()
    }

    getBrandById(id: number) {
        const existBrand = this.brandRepository.findOne({ where: { id: id } })
        if (!existBrand) {
            throw new NotFoundException(`Could not find brand with id: ${id}`)
        }
        return existBrand
    }

    async updateBrand(id: number, brand: CreateBrandDto) {
        const existBrand = await this.brandRepository.findOne({
            where: { id: id }
        })

        if (!existBrand) {
            throw new NotFoundException(`Could not find brand with id: ${id}`)
        }
        Object.assign(existBrand, brand)
        return await this.brandRepository.save(existBrand)
    }

    async deleteBrand(id: number) {
        const existBrand = await this.brandRepository.findOne({
            where: { id: id }
        })

        if (!existBrand) {
            throw new NotFoundException(`Could not find brand with id: ${id}`)
        }

        return await this.brandRepository.delete({ id: id })
    }
}
