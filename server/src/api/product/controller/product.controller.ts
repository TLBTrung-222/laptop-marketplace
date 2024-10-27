import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('products')
@Controller('products')
export class ProductController {
    @Get()
    getAllProduct() {
        return 'return all products'
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return `get product with id: ${id}`
    }

    @Post()
    createProduct(@Body() body: any) {
        return `created product with body: ${JSON.stringify(body)}`
    }

    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() body: any) {
        return `updated product: ${id}, with body: ${JSON.stringify(body)}`
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return `deleted product with id: ${id}`
    }

    @Get(':id/specifications')
    getProductSpecification(@Param('id') id: string) {
        return `get product specification of id: ${id}`
    }

    @Put(':id/specifications')
    updateProductSpecification(@Param('id') id: string, @Body() body: any) {
        return `update product specification of id: ${id}, with body: ${JSON.stringify(body)}`
    }

    @Get(':id/images')
    getProductImages(@Param('id') id: string) {
        return `get product images of id: ${id}`
    }

    @Post(':id/images')
    addProductImages(@Param('id') id: string) {
        return `add product images of id: ${id}`
    }

    @Delete(':id/images/:imageId')
    deleteProductImage(
        @Param('id') id: string,
        @Param('imageId') imageId: string
    ) {
        return `delete product images of id: ${id}, image id: ${imageId}`
    }
}
