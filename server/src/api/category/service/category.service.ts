import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/database/entities/category.entity";
import { Repository } from "typeorm";
import { CategoryDto } from "../dto/category.dto";

@Injectable()
export class CategoryService{

    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>
    ){}

    async getAllCategories(){
        return this.categoryRepository.find();
    }

    async getCategoryById(categoryId: number){
        const exist = await this.categoryRepository.findOne({
            where:{id: categoryId}
        });

        if(!exist) throw new NotFoundException('Category not found')
        return exist;
    }

    async createCategory(categoryDto: CategoryDto ){
        const exist = await this.categoryRepository.findOne(
            {
                select:['type'],
                where:{type: categoryDto.type}
            }
        )

        if (exist) throw new BadRequestException('Category already existed')
        const newCategory = this.categoryRepository.create(
            {type: categoryDto.type}
        )
        
        return await this.categoryRepository.save(newCategory);
    }

    async updateCategory(id: number, category: CategoryDto){
        const exist = await this.categoryRepository.findOne({where: {id: id}})

        if (!exist){
            throw new NotFoundException(`Cannot find category with id: ${id}`)
        }

        Object.assign(exist, category)
        return await this.categoryRepository.save(exist);
    }


    async deleteCategory(id: number){
        const exist = await this.categoryRepository.findOne(
            {
                select:['type'],
                where:{id: id}
            }
        )

        if (!exist) throw new NotFoundException('Category not found')
        return await this.categoryRepository.delete({id:id})   
    }
}