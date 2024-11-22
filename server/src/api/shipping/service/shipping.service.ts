import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ShippingEntity } from 'src/database/entities/shipping.entity'
import { Repository } from 'typeorm'
import { CreateShippingDto } from '../dto/shipping.dto'
import { OrderEntity } from 'src/database/entities/order.entity'

@Injectable()
export class ShippingService {
    constructor(
        @InjectRepository(ShippingEntity)
        private shippingRepository: Repository<ShippingEntity>
    ) {}

    async createShipping(
        order: OrderEntity,
        shippingInfors: CreateShippingDto
    ) {
        const newShipping = this.shippingRepository.create({
            city: shippingInfors.city,
            district: shippingInfors.district,
            street: shippingInfors.street,
            order
        })

        return this.shippingRepository.save(newShipping)
    }
}
