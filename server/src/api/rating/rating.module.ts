import { Module } from '@nestjs/common'
import { RatingController } from './controller/rating.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RatingEntity } from 'src/database/entities/rating.entity'
import { RatingService } from './service/rating.service'
import { ProductEntity } from 'src/database/entities/product.entity'
import { AccountEntity } from 'src/database/entities/account.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([RatingEntity, ProductEntity, AccountEntity])
    ],
    controllers: [RatingController],
    providers: [RatingService],
    exports: [RatingService]
})
export class RatingModule {}
