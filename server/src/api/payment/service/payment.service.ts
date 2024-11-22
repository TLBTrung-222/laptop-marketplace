import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity } from 'src/database/entities/order.entity'
import { Repository } from 'typeorm'
import * as crypto from 'crypto'
import { VnpParams } from 'src/types'
import { CreateVNPAYPaymentDto } from '../dto/payment.dto'
import { PaymentEntity } from 'src/database/entities/payment.entity'
import { PaymentMethod } from 'src/shared/enum/payment.enum'

@Injectable()
export class PaymentService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,
        @InjectRepository(PaymentEntity)
        private paymentRepository: Repository<PaymentEntity>
    ) {}

    // for payment method: COD
    async createPaymentCod(order: OrderEntity, paymentAmount: number) {
        // just add the payment to db
        const newPayment = this.paymentRepository.create({
            order,
            paymentAmount,
            paymentMethod: PaymentMethod.COD
        })

        return this.paymentRepository.save(newPayment)
    }

    // for payment method: Vnpay
    async createPaymentUrl(dto: CreateVNPAYPaymentDto) {
        // make sure order is exist
        const existOrder = await this.orderRepository.findOneBy({
            id: dto.orderId
        })

        if (!existOrder)
            throw new NotFoundException(
                `Order with id: ${dto.orderId} not founded`
            )

        const amount = existOrder.totalAmount

        /* -------------------------------------------------------------------------- */
        /*                         construct params for vnpay                         */
        /* -------------------------------------------------------------------------- */
        let vnpParams = {} as VnpParams

        // env value
        vnpParams['vnp_TmnCode'] = this.configService.get('vnp_TmnCode')
        vnpParams['vnp_ReturnUrl'] = this.configService.get('vnp_ReturnUrl')

        // fix values
        vnpParams['vnp_Version'] = '2.1.0'
        vnpParams['vnp_Command'] = 'pay'
        vnpParams['vnp_Locale'] = 'vn'
        vnpParams['vnp_CurrCode'] = 'VND'
        vnpParams['vnp_OrderType'] = 'other'

        // passed values
        vnpParams['vnp_TxnRef'] = String(Date.now())
        vnpParams['vnp_OrderInfo'] =
            'Thanh toan GD voi orderId = ' + dto.orderId
        vnpParams['vnp_Amount'] = String(amount * 100)
        vnpParams['vnp_IpAddr'] = dto.ipAddress
        if (dto.bankCode) {
            vnpParams['vnp_BankCode'] = dto.bankCode
        }

        // generated values
        vnpParams['vnp_CreateDate'] = this.dateToYYYYMMDDHHmmss()
        vnpParams['vnp_ExpireDate'] = this.dateToYYYYMMDDHHmmss(10)
        vnpParams = this.sortObject(vnpParams)
        /* -------------------------------------------------------------------------- */
        /*                                add check sum                               */
        /* -------------------------------------------------------------------------- */

        // create check sum based on vnpParams
        const secureHash = this.createChecksum(vnpParams)
        vnpParams['vnp_SecureHash'] = secureHash

        // append checksum to query string
        const vnpUrl = this.configService.get('vnp_Url')
        return `${vnpUrl}?${new URLSearchParams(vnpParams).toString()}`
    }

    async handleReturnUrl(vnpParams: VnpParams) {
        const secureHash = vnpParams.vnp_SecureHash

        delete vnpParams['vnp_SecureHash']
        delete vnpParams['vnp_SecureHashType']

        const signed = this.createChecksum(vnpParams)

        if (secureHash == signed) {
            /* -------------------------------------------------------------------------- */
            //!                          TODO: save infor to database                     */
            /* -------------------------------------------------------------------------- */
            return { code: vnpParams['vnp_ResponseCode'] } // if order success, vnp_ResponseCode is '00'
        } else return { code: '97' }
    }

    private dateToYYYYMMDDHHmmss(expireTime?: number) {
        const now = new Date()

        if (expireTime) {
            now.setMinutes(now.getMinutes() + expireTime) // Add specified minutes
        }

        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0') // Months are 0-based
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        return `${year}${month}${day}${hours}${minutes}${seconds}`
    }

    private sortObject(obj: VnpParams): VnpParams {
        const sorted = {} as VnpParams
        const keys = Object.keys(obj).sort()
        for (const key of keys) {
            sorted[key] = obj[key]
        }
        return sorted
    }

    private createChecksum(vnpParams: VnpParams) {
        // sort objects
        vnpParams = this.sortObject(vnpParams)

        // Convert the vnpParams object to a query string
        const signData = new URLSearchParams(vnpParams).toString()

        // Retrieve the secret key from the configuration service
        const secretKey = this.configService.get('vnp_HashSecret')

        // Create an HMAC instance using the SHA-512 hashing algorithm and the secret key
        const hmac = crypto.createHmac('sha512', secretKey)

        // Update the HMAC instance with the signData converted to a Buffer
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

        // Return the generated HMAC hash as the checksum
        return signed
    }
}
