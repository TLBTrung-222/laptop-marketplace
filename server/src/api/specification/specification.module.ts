import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SpecificationEntity } from 'src/database/entities/specification.entity'
import { SpecificationService } from './service/specification.service'
import { ProductEntity } from 'src/database/entities/product.entity'

@Module({
    imports: [TypeOrmModule.forFeature([SpecificationEntity, ProductEntity])],
    controllers: [],
    providers: [SpecificationService],
    exports: [SpecificationService]
})
export class SpecificationModule {}
