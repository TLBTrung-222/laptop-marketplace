import { Module } from '@nestjs/common'
import { BrandController } from './controller/brand.controller'

@Module({
    controllers: [BrandController]
})
export class BrandModule {}
