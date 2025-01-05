import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Mail from 'nodemailer/lib/mailer'
import { createTransport } from 'nodemailer'
import { OrderEntity } from 'src/database/entities/order.entity'

@Injectable()
export class EmailService {
    private nodeMailerTransporter: Mail

    constructor(private configService: ConfigService) {
        this.nodeMailerTransporter = createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: configService.get('SMTP_MAIL'),
                pass: configService.get('SMTP_PASSWORD')
            }
        })
    }

    async sendSignUpEmail(receiver: string) {
        const info = await this.nodeMailerTransporter.sendMail({
            from: '"Laptop Marketplace" <laptop.marketplace.se347@gmail.com>', // sender address
            to: receiver, // list of receivers
            subject: 'Sign up account succesfully at SE347 Laptop-Marketplace', // Subject line
            text: 'Thank you for signing up to our marketplace', // plain text body
            html: '<b>Thank you for signing up to our marketplace</b>' // html body
        })
    }

    async sendOrderCreatedEmail(buyerEmail: string, order: OrderEntity) {
        const info = await this.nodeMailerTransporter.sendMail({
            from: '"Laptop Marketplace" <laptop.marketplace.se347@gmail.com>', // sender address
            to: buyerEmail, // list of receivers
            subject: 'Order placed succesfully at SE347 Laptop-Marketplace', // Subject line
            text: `Your order with orderId=${order.id}, total amount=${order.totalAmount}, date=${order.orderDate} has been placed succesfully`, // plain text body
            html: `<b>Your order with orderId=${order.id}, total amount=${order.totalAmount}, date=${order.orderDate} has been placed succesfully</b>` // html body
        })
    }
}
