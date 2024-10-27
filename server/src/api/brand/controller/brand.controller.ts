import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('brands')
@Controller('brands')
export class BrandController {
    @Get()
    getAllBrands() {
        return 'return all brands'
    }

    @Get(':id')
    getBrandWithId(@Param('id') id: string) {
        return `get brand with id ${id}`
    }

    @Post()
    createBrand(@Body() body: any) {
        return `create brands with body: ${JSON.stringify(body)}`
    }

    @Put(':id')
    updateBrand(@Param('id') id: string, @Body() body: any) {
        return `update brands ${id} with body: ${JSON.stringify(body)}`
    }

    @Delete(':id')
    deleteBrand(@Param('id') id: string) {
        return `delete brand with id ${id}`
    }
}
