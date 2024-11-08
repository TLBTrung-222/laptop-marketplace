import { Module } from '@nestjs/common'
import { CategoryController } from './controller/category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from 'src/database/entities/category.entity'
import { CategoryService } from './service/category.service'

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: []
})
export class CategoryModule {}
