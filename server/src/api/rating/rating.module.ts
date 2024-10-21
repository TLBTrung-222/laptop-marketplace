import { Module } from '@nestjs/common'
import { RatingController } from './controller/rating.controller'

@Module({
    controllers: [RatingController]
})
export class RatingModule {}
