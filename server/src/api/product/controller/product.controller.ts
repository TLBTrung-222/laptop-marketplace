import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Session,
    UploadedFile,
    UseInterceptors
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
import {
    CreateProductDto,
    UpdateProductDto,
    ViewProductDto
} from '../dto/product.dto'
import { RatingService } from 'src/api/rating/service/rating.service'
import { CreateRatingDto, ViewRatingDto } from 'src/api/rating/dto/rating.dto'
import { RatingEntity } from 'src/database/entities/rating.entity'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'
import { Serialize } from 'src/shared/interceptor/serialize.interceptor'
import { ProductEntity } from 'src/database/entities/product.entity'
import { SpecificationService } from 'src/api/specification/service/specification.service'
import { FileInterceptor } from '@nestjs/platform-express'
import {
    CreateSpecificationDto,
    ViewSpecificationDto
} from 'src/api/specification/dto/specification.dto'
import { SpecificationEntity } from 'src/database/entities/specification.entity'

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
        private ratingService: RatingService,
        private specificationService: SpecificationService
    ) {}

    /* -------------------------------------------------------------------------- */
    /*                                Product routes                              */
    /* -------------------------------------------------------------------------- */
    @Serialize(ViewProductDto)
    @ApiOperation({ summary: 'Return all products' })
    @ApiOkResponse({
        description: 'All product returned succesfully',
        isArray: true,
        type: ProductEntity
    })
    @Get()
    getAllProduct() {
        return this.productService.findAll()
    }

    @Serialize(ViewProductDto)
    @ApiOperation({ summary: 'Get a product by id' })
    @ApiOkResponse({
        description: 'Get product by id succesfully',
        type: ProductEntity
    })
    @ApiNotFoundResponse({ description: 'Can not find product with given id' })
    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productService.findById(parseInt(id))
    }

    @Serialize(ViewProductDto)
    @ApiOperation({ summary: 'Create a product' })
    @ApiOkResponse({
        description: 'Created new product succesfully',
        type: ProductEntity
    })
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

    @Serialize(ViewProductDto)
    @ApiOperation({ summary: 'Update a product' })
    @ApiOkResponse({
        description: 'Updated product succesfully',
        type: ProductEntity
    })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Auth([RoleId.Seller])
    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
        return this.productService.update(parseInt(id), body)
    }

    @Serialize(ViewProductDto)
    @ApiOperation({ summary: 'Delete a product' })
    @ApiOkResponse({ description: 'Product deleted successfully' })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Auth([RoleId.Seller])
    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return await this.specificationService.remove(parseInt(id))
    }

    /* -------------------------------------------------------------------------- */
    /*                                Rating routes                               */
    /* -------------------------------------------------------------------------- */
    @Serialize(ViewRatingDto)
    @ApiOperation({ summary: 'Get all ratings for a product' })
    @ApiOkResponse({
        description: 'All ratings for this product returned succesfully',
        isArray: true,
        type: RatingEntity
    })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Get(':id/ratings')
    async getProductRatings(@Param('id') productId: string) {
        return this.ratingService.findByProductId(parseInt(productId))
    }

    @Serialize(ViewRatingDto)
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

    /* -------------------------------------------------------------------------- */
    /*                            Specification routes                            */
    /* -------------------------------------------------------------------------- */
    @Serialize(ViewSpecificationDto)
    @ApiOperation({ summary: 'Get specification by product id' })
    @ApiCreatedResponse({
        description: 'Rating created successfully',
        type: SpecificationEntity
    })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Get(':id/specifications')
    async getProductSpecification(@Param('id') productId: string) {
        const specification = await this.specificationService.findById(
            parseInt(productId)
        )
        return specification
    }

    @Serialize(ViewSpecificationDto)
    @ApiOperation({ summary: 'Create specification of product' })
    @Auth([RoleId.Seller])
    @Post(':id/specifications')
    async createProductSpecification(
        @Param('id') id: string,
        @Body() body: CreateSpecificationDto
    ) {
        return await this.specificationService.create(parseInt(id), body)
    }

    @Serialize(ViewSpecificationDto)
    @ApiOperation({ summary: 'Update specification of product' })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Auth([RoleId.Seller])
    @Put(':id/specifications')
    async updateProductSpecification(
        @Param('id') id: string,
        @Body() body: Partial<CreateSpecificationDto>
    ) {
        return await this.specificationService.update(parseInt(id), body)
    }

    @Serialize(ViewSpecificationDto)
    @ApiOperation({ summary: 'Delete specification of product' })
    @ApiOkResponse({ description: 'Specification deleted succesfully' })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Auth([RoleId.Seller])
    @Delete(':id/specifications')
    async deleteProductSpecification(@Param('id') id: string) {
        return this.specificationService.remove(parseInt(id))
    }
    /* -------------------------------------------------------------------------- */
    /*                                Images routes                               */
    /* -------------------------------------------------------------------------- */
    @Serialize(ViewProductDto)
    @ApiOperation({ summary: 'Get images by product id' })
    @Get(':id/images')
    getProductImages(@Param('id') id: string) {
        return this.productService.getImage(parseInt(id))
    }

    @ApiOperation({ summary: 'Post images by product id' })
    @UseInterceptors(FileInterceptor('file'))
    @Post(':id/images')
    addProductImages(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.productService.uploadImage(parseInt(id), file.buffer)
    }

    @ApiOperation({ summary: 'Delete a image' })
    @Delete(':id/images/:imageId')
    deleteProductImage(
        @Param('id') id: string,
        @Param('imageId') imageId: string
    ) {
        return this.productService.deleteImage(parseInt(id), parseInt(imageId))
    }
}
