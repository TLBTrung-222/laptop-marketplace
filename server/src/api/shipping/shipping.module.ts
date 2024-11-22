import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShippingEntity } from 'src/database/entities/shipping.entity'
import { ShippingService } from './service/shipping.service'

@Module({
    imports: [TypeOrmModule.forFeature([ShippingEntity])],
    providers: [ShippingService],
    exports: [ShippingService]
})
export class ShippingModule {}
