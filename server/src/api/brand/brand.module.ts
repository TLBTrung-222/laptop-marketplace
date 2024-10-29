import { Module } from '@nestjs/common'
import { BrandController } from './controller/brand.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandEntity } from 'src/database/entities/brand.entity'
import { BrandService } from './service/brand.service'

@Module({
    imports:[TypeOrmModule.forFeature([BrandEntity])],
    controllers: [BrandController],
    providers: [BrandService],  // Add necessary services here if required.
    exports:[]
})
export class BrandModule {}
