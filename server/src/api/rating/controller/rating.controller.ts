import { Body, Controller, Delete, Get, Param, Post, Put, Session } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { RatingService } from '../service/rating.service'
import { CreateRatingDto, UpdateRatingDto } from '../dto/rating.dto'
import { Session as ExpressSession } from 'express-session'

@ApiTags('ratings')
@Controller('ratings')
export class RatingController {
    constructor(private ratingService: RatingService){}

    @ApiOperation({summary:'Get all ratings'})
    @Get()
    getAllRatings(){
        return this.ratingService.findAll();
    }

    @ApiOperation({summary:'Get rating by id'})
    @Get(':id')
    getRatingById(@Param('id') id:string){
        return this.ratingService.findById(parseInt(id))
    }

    @ApiOperation({summary:'Create a rating'})
    @Post()
    createRating(
        @Body() body: CreateRatingDto,
        @Session() session: ExpressSession
    ){
        const buyerId= session.accountId
        return this.ratingService.create(buyerId, body)
    }

    @ApiOperation({summary:'Update a rating'})
    @Put(':id')
    updateRating(
        @Param('id') id: string, 
        @Body() body: UpdateRatingDto,
        @Session() session: ExpressSession
    ) {
        const buyer = session.accountId
        return this.ratingService.update(parseInt(id), buyer, body)
    }

    @ApiOperation({summary:'Delete a rating'})
    @Delete(':id')
    deleteRating(@Param('id') id:string){
        return this.ratingService.delete(parseInt(id))
    }
}
