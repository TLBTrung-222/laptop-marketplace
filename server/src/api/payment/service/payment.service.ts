import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity } from 'src/database/entities/order.entity'
import { Repository } from 'typeorm'
import * as crypto from 'crypto'
import { PaymentUrlParams, VnpParams } from 'src/types'
import { PaymentEntity } from 'src/database/entities/payment.entity'
import { PaymentMethod, PaymentStatus } from 'src/shared/enum/payment.enum'
import { FundTransactionEntity } from 'src/database/entities/fund-transaction.entity'
import { FundTransactionStatus } from 'src/shared/enum/fund-transaction.enum'
import { FundEntity } from 'src/database/entities/fund.entity'

@Injectable()
export class PaymentService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(PaymentEntity)
        private paymentRepository: Repository<PaymentEntity>,
        @InjectRepository(FundTransactionEntity)
        private fundTransactionRepository: Repository<FundTransactionEntity>,
        @InjectRepository(FundEntity)
        private fundRepository: Repository<FundEntity>
    ) {}

    // create payment infor and save to db
    async createPayment(
        order: OrderEntity,
        paymentAmount: number,
        paymentMethod: PaymentMethod
    ) {
        // just add the payment to db
        const newPayment = this.paymentRepository.create({
            order,
            paymentAmount,
            paymentMethod
        })

        return this.paymentRepository.save(newPayment)
    }

    async generatePaymentUrl(dto: PaymentUrlParams) {
        // get the payment id, used for vnp_TxnRef
        const existPayment = await this.paymentRepository.findOne({
            where: { order: { id: dto.order.id } }
        })
        if (!existPayment)
            throw new NotFoundException(
                `Payment of this order: ${dto.order.id} not founded`
            )

        const amount = dto.order.totalAmount

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
        vnpParams['vnp_TxnRef'] = String(existPayment.id)
        vnpParams['vnp_OrderInfo'] =
            'Thanh toan GD voi orderId = ' + dto.order.id
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
            /*                update payment status, fund_transaction, fund               */
            /* -------------------------------------------------------------------------- */
            const paymentId = parseInt(vnpParams['vnp_TxnRef'])
            const existPayment = await this.paymentRepository.findOne({
                where: { id: paymentId },
                relations: { order: true }
            })

            if (!existPayment)
                throw new NotFoundException(
                    `Can not find payment with id: ${paymentId}`
                )

            // change paymentStatus from 0 to 1, update payment date + credit payment amount to seller's fund
            if (existPayment.paymentStatus === PaymentStatus.UNPAID)
                existPayment.paymentStatus = PaymentStatus.PAID
            else
                throw new BadRequestException(
                    `The payment with id: ${paymentId} already been paid`
                )
            existPayment.paymentDate = this.parseVnpPayDate(
                // vnp_PayDate in format: yyyyMMddHHmmss
                vnpParams['vnp_PayDate']
            )

            await this.paymentRepository.save(existPayment)

            // update creditStatus of each order's fundTransaction from 0 to 1
            const fundTransactions = await this.fundTransactionRepository.find({
                where: { order: { id: existPayment.order.id } },
                relations: { fund: true }
            })
            // console.log(fundTransactions[0].fund === fundTransactions[1].fund) // false
            for (const transaction of fundTransactions) {
                // Mark the fund transaction as paid
                transaction.creditStatus = FundTransactionStatus.PAID

                // Refetch the fund to ensure it has the latest state
                const fund = await this.fundRepository.findOne({
                    where: { fundId: transaction.fund.fundId }
                })

                // Credit the amount to the seller's fund
                fund.balance += transaction.creditAmount

                // Save updated fund and transaction
                await this.fundRepository.save(fund)
                await this.fundTransactionRepository.save(transaction)
            }

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

    private parseVnpPayDate(vnpPayDate: string): Date {
        const year = parseInt(vnpPayDate.substring(0, 4))
        const month = parseInt(vnpPayDate.substring(4, 6)) - 1 // Month is 0-based in JavaScript
        const day = parseInt(vnpPayDate.substring(6, 8))
        const hour = parseInt(vnpPayDate.substring(8, 10))
        const minute = parseInt(vnpPayDate.substring(10, 12))
        const second = parseInt(vnpPayDate.substring(12, 14))

        return new Date(Date.UTC(year, month, day, hour, minute, second))
    }
}
