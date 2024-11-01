import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Session
} from '@nestjs/common'
import {
    ApiBadRequestResponse,
    ApiCookieAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { ProductService } from '../service/product.service'
import { Session as ExpressSession } from 'express-session'
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto'
import { RatingService } from 'src/api/rating/service/rating.service'
import { CreateRatingDto } from 'src/api/rating/dto/rating.dto'
import { RatingEntity } from 'src/database/entities/rating.entity'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'

@ApiTags('products')
@ApiCookieAuth()
@ApiUnauthorizedResponse({ description: 'Account is not logged in' })
@ApiForbiddenResponse({
    description: 'Access to the requested endpoint is forbidden'
})
@Controller('products')
export class ProductController {
    constructor(
        private productService: ProductService,
        private ratingService: RatingService
    ) {}

    @ApiOperation({ summary: 'Return all products' })
    @ApiOkResponse({ description: 'All product returned succesfully' })
    @Get()
    getAllProduct() {
        return this.productService.findAll()
    }

    @ApiOperation({ summary: 'Get a product by id' })
    @ApiOkResponse({ description: 'Get product by id succesfully' })
    @ApiNotFoundResponse({ description: 'Can not find product with given id' })
    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productService.findById(parseInt(id))
    }

    @ApiOperation({ summary: 'Create a product' })
    @ApiOkResponse({ description: 'Created new product succesfully' })
    @Auth([RoleId.Seller])
    @ApiBadRequestResponse({ description: 'Invalid input' })
    @ApiNotFoundResponse({
        description: 'Brand or Seller or Category not found by the given id'
    })
    @Post()
    createProduct(
        @Body() body: CreateProductDto,
        @Session() session: ExpressSession
    ) {
        const sellerId = session.accountId
        return this.productService.create(sellerId, body)
    }

    @ApiOperation({ summary: 'Update a product' })
    @ApiOkResponse({ description: 'Updated product succesfully' })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Auth([RoleId.Seller])
    @Put(':id')
    updateProduct(
        @Param('id') id: string,
        @Body() body: UpdateProductDto,
        @Session() session: ExpressSession
    ) {
        const sellerId = session.accountId
        return this.productService.update(parseInt(id), sellerId, body)
    }

    @ApiOperation({ summary: 'Delete a product' })
    @ApiOkResponse({ description: 'Product deleted successfully' })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Auth([RoleId.Seller])
    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return await this.productService.delete(parseInt(id))
    }

    @ApiOperation({ summary: 'Get all ratings for a product' })
    @ApiOkResponse({
        description: 'All ratings for this product returned succesfully'
    })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Get(':id/ratings')
    async getProductRatings(@Param('id') productId: string) {
        return this.ratingService.findByProductId(parseInt(productId))
    }

    @ApiOperation({ summary: 'Create new rating for a product' })
    @ApiCreatedResponse({
        description: 'Rating created successfully',
        type: RatingEntity
    })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    @ApiNotFoundResponse({ description: 'Product or buyer not found' })
    @Auth([RoleId.Buyer])
    @Post(':id/ratings')
    async addProductRating(
        @Param('id') productId: string,
        @Session() session: ExpressSession,
        @Body() body: CreateRatingDto
    ) {
        const buyerId = session.accountId
        return this.ratingService.create(parseInt(productId), buyerId, body)
    }

    // @Get(':id/specifications')
    // getProductSpecification(@Param('id') id: string) {
    //     return `get product specification of id: ${id}`
    // }

    // @Put(':id/specifications')
    // updateProductSpecification(@Param('id') id: string, @Body() body: any) {
    //     return `update product specification of id: ${id}, with body: ${JSON.stringify(body)}`
    // }

    // @Get(':id/images')
    // getProductImages(@Param('id') id: string) {
    //     return `get product images of id: ${id}`
    // }

    // @Post(':id/images')
    // addProductImages(@Param('id') id: string) {
    //     return `add product images of id: ${id}`
    // }

    // @Delete(':id/images/:imageId')
    // deleteProductImage(
    //     @Param('id') id: string,
    //     @Param('imageId') imageId: string
    // ) {
    //     return `delete product images of id: ${id}, image id: ${imageId}`
    // }
}
