import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'

@Controller('categories')
export class CategoryController {
    @Get()
    getAllCategories() {
        return 'return all categories'
    }

    @Get(':id')
    getCategoryWithId(@Param('id') id: string) {
        return `get category with id ${id}`
    }

    @Post()
    createCategory(@Body() body: any) {
        return `create category with body: ${JSON.stringify(body)}`
    }

    @Put(':id')
    updateCategory(@Param('id') id: string, @Body() body: any) {
        return `update category ${id} with body: ${JSON.stringify(body)}`
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return `delete category with id ${id}`
    }
}
