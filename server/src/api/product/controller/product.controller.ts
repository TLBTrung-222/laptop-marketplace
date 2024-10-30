import { Body, Controller, Delete, Get, Param, Post, Put, Session } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductService } from '../service/product.service'
import { Session as ExpressSession } from 'express-session'
import { createProductDto, updateProductDto } from '../dto/product.dto'

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService){}

    @ApiOperation({summary:'All products returned'})
    @Get()
    getAllProduct() {
        return this.productService.findAll()
    }

    @ApiOperation({summary:'Get a product by id'})
    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productService.findById(parseInt(id))
    }

    @ApiOperation({summary:'Create a product'})
    @Post()
    createProduct(@Body() body: createProductDto, @Session() session: ExpressSession) {
        console.log(body)
        const sellerId = session.accountId
        return this.productService.create(sellerId, body)
    }

    @ApiOperation({summary: 'Update a product'})
    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() body: updateProductDto, @Session() session: ExpressSession) {
        const sellerId = session.accountId
        return this.productService.update(parseInt(id),sellerId, body)
    }

    @ApiOperation({summary:'Delete a product'})
    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return await this.productService.delete(parseInt(id))
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
