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
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger'
import { RatingService } from '../service/rating.service'
import { CreateRatingDto, UpdateRatingDto } from '../dto/rating.dto'
import { Session as ExpressSession } from 'express-session'
import { RatingEntity } from 'src/database/entities/rating.entity'

@ApiTags('ratings')
@Controller('ratings')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @ApiOperation({ summary: 'Get all ratings' })
    @ApiOkResponse({
        description: 'All rating returned succesfully',
        isArray: true,
        type: RatingEntity
    })
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
    @Put(':id')
    updateRating(@Param('id') ratingId: string, @Body() body: UpdateRatingDto) {
        return this.ratingService.update(parseInt(ratingId), body)
    }

    @ApiOperation({ summary: 'Delete a rating' })
    @ApiOkResponse({ description: 'Rating deleted succesfully' })
    @ApiNotFoundResponse({ description: 'Can not find rating with given id' })
    @Delete(':id')
    deleteRating(@Param('id') id: string) {
        return this.ratingService.delete(parseInt(id))
    }
}
