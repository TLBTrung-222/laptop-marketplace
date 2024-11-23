import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ShippingEntity } from 'src/database/entities/shipping.entity'
import { Repository } from 'typeorm'
import {
    CreateShippingDto,
    UpdateShippingDto,
    UpdateShippingStatusDto
} from '../dto/shipping.dto'
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

    async getShipping(orderId: number) {
        return this.shippingRepository.findOne({
            where: { order: { id: orderId } }
        })
    }

    async updateShipping(orderId: number, dto: UpdateShippingDto) {
        const existShipping = await this.getShipping(orderId)

        if (!existShipping)
            throw new NotFoundException(
                `Shipping with order id: ${orderId} not founded`
            )

        Object.assign(existShipping, dto)

        return this.shippingRepository.save(existShipping)
    }

    // admin
    async updateShippingStatus(orderId: number, dto: UpdateShippingStatusDto) {
        const existShipping = await this.getShipping(orderId)

        if (!existShipping)
            throw new NotFoundException(
                `Shipping with order id: ${orderId} not founded`
            )

        existShipping.shippingStatus = dto.status
        return this.shippingRepository.save(existShipping)
    }
}
