import { Module } from '@nestjs/common'
import { CategoryController } from './controller/category.controller'

@Module({
    controllers: [CategoryController]
})
export class CategoryModule {}
