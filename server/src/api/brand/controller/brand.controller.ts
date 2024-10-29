import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { BrandService } from '../service/brand.service'
import { BrandDto } from '../dto/brand.dto'

@ApiTags('brands')
@Controller('brands')
export class BrandController {
    constructor(private brandService: BrandService){}

    @ApiOperation({ summary:'Get all brands'})
    @ApiOkResponse({
        description: "All brands returned successfully",
        isArray: true,
        type: BrandDto
    })
    @Get()
    getAllBrands() {
        return this.brandService.getAllBrands()
    }

    @ApiOperation({ summary: 'Get a brand by its id'})
    @ApiOkResponse({description:'A brand returned'})
    @ApiNotFoundResponse({description:'Brand not found'})
    @Get(':id')
    getBrandWithId(@Param('id') id: string) {
        return this.brandService.getBrandById(parseInt(id))
    }

    @ApiOperation({summary: 'Create a brand'})
    @ApiCreatedResponse({
        description: 'New brand created successfully',
        type: BrandDto
    })
    @ApiBadRequestResponse({description: 'Brand already existed'})
    @Post()
    createBrand(@Body() body: BrandDto) {
        return this.brandService.create(body)
    }

    @ApiOperation({ summary: 'Update name of a brand'})
    @ApiOkResponse({ description:'Update name of brand successfully' })
    @ApiNotFoundResponse({description:'Brand not found'})
    @Put(':id')
    updateBrand(@Param('id') id: string, @Body() body: BrandDto) {
        return this.brandService.updateBrand(parseInt(id), body)
    }

    @ApiOperation({ summary: 'Delete a brand by its id'})
    @ApiOkResponse({description:'Deleted brand'})
    @ApiNotFoundResponse({description:'Brand not found'})
    @Delete(':id')
    deleteBrand(@Param('id') id: string) {
        return this.brandService.deleteBrand(parseInt(id))
    }
}
