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
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { RatingService } from '../service/rating.service'
import { UpdateRatingDto } from '../dto/rating.dto'
import { RatingEntity } from 'src/database/entities/rating.entity'
import { Auth } from 'src/shared/decorator/auth.decorator'
import { RoleId } from 'src/shared/enum/role.enum'

@ApiTags('ratings')
@ApiUnauthorizedResponse({ description: 'Account is not logged in' })
@ApiForbiddenResponse({
    description: 'Access to the requested endpoint is forbidden'
})
@Controller('ratings')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @ApiOperation({ summary: 'Get all ratings' })
    @ApiOkResponse({
        description: 'All rating returned succesfully',
        isArray: true,
        type: RatingEntity
    })
    @Auth([RoleId.Admin])
    @Get()
    getAllRatings() {
        return this.ratingService.findAll()
    }

    @ApiOperation({ summary: 'Get rating by id' })
    @ApiOkResponse({ description: 'Rating for a product returned succesfully' })
    @ApiNotFoundResponse({ description: 'Can not find product with given id' })
    @Get(':id')
    getRatingById(@Param('id') id: string) {
        return this.ratingService.findById(parseInt(id))
    }

    @ApiOperation({ summary: 'Update a rating' })
    @ApiOkResponse({ description: 'Rating updated succesfully' })
    @ApiNotFoundResponse({ description: 'Can not find rating with given id' })
    @Auth([RoleId.Admin])
    @Put(':id')
    updateRating(@Param('id') ratingId: string, @Body() body: UpdateRatingDto) {
        return this.ratingService.update(parseInt(ratingId), body)
    }

    @ApiOperation({ summary: 'Delete a rating' })
    @ApiOkResponse({ description: 'Rating deleted succesfully' })
    @ApiNotFoundResponse({ description: 'Can not find rating with given id' })
    @Auth([RoleId.Buyer, RoleId.Admin])
    @Delete(':id')
    deleteRating(@Param('id') id: string) {
        return this.ratingService.delete(parseInt(id))
    }
}
