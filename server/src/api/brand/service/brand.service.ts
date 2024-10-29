import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "src/database/entities/brand.entity";
import { Repository } from "typeorm";
import { BrandDto } from "../dto/brand.dto";

@Injectable()
export class BrandService{
    constructor(
        @InjectRepository(BrandEntity)
        private brandRepository: Repository<BrandEntity>
    ){}

    async create(brand: BrandDto){
        const exist = await this.brandRepository.findOne({where:{name: brand.name}})
        if(exist){
            throw new BadRequestException('Brand already existed')
        }
        
        const newBrand = this.brandRepository.create(brand)
        return await this.brandRepository.save(newBrand)
    }

    getAllBrands(){
        return this.brandRepository.find();
    }

    getBrandById(id:number){
        const exist = this.brandRepository.findOne({where: {id:id}});
        if(!exist){
            throw new NotFoundException("Brand not found");
        }
        return exist;
    }

    async updateBrand(id:number, brand: BrandDto){
        const exist = await this.brandRepository.findOne({where:{id:id}});
        
        if(!exist){
            throw new NotFoundException("Could not find brand")
        }

        Object.assign(exist, brand)
        return await this.brandRepository.save(exist)
    }

    async deleteBrand(id: number){
        const exist = await this.brandRepository.findOne({where:{id:id}});
        
        if (!exist){
            throw new NotFoundException(`Could not find brand with id: ${id}`)
        }

        return await this.brandRepository.delete({id:id})
    }
}