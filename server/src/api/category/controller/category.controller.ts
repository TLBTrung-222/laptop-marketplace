import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { ApiBadRequestResponse } from '@nestjs/swagger'
import { ApiOkResponse } from '@nestjs/swagger'
import { ApiOperation } from '@nestjs/swagger'
import { ApiTags } from '@nestjs/swagger'
import { CategoryService } from '../service/category.service'
import { CategoryDto, ViewCategoryDto } from '../dto/category.dto'
import { Serialize } from 'src/shared/interceptor/serialize.interceptor'

@ApiTags('categories')
@Controller('categories')
@Serialize(ViewCategoryDto)
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @ApiOperation({ summary: 'All categories'})
    @Get()
    async getAllCategories() {
        // return 'return all categories'
        return await this.categoryService.getAllCategories()
    }

    @ApiOperation({ summary: 'Category with this id'})
    @Get(':id')
    async getCategoryWithId(@Param('id') id: string) {
        // return `get category with id ${id}`
        return await this.categoryService.getCategoryById(parseInt(id))
    }

    @ApiOperation({ summary:'Create a new category'})
    @ApiOkResponse({ 
        description:'A new category is created',
        type: CategoryDto
    })
    @ApiBadRequestResponse({ description: 'Category already existed'})
    @Post()
    async createCategory(@Body() categoryDto: CategoryDto) {
        // return `create category with body: ${JSON.stringify(body)}`
        return this.categoryService.createCategory(categoryDto)
    }

    @ApiOperation({ summary: 'Update a category'})
    @Put(':id')
    async updateCategory(@Param('id') id: string, @Body() body: CategoryDto) {
        // return `update category ${id} with body: ${JSON.stringify(body)}`
        return this.categoryService.updateCategory(parseInt(id), body)
    }

    @ApiOperation({ summary: 'Delete a category'})
    @Delete(':id')
    async deleteCategory(@Param('id') id: string) {
        // return `delete category with id ${id}`
        return await this.categoryService.deleteCategory(parseInt(id))
    }
}
