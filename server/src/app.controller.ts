import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller()
export class AppController {
    @Get()
    getRequestSource(@Req() req: Request): object {
        return {
            ip: req.ip, // The client's IP address
            hostname: req.hostname, // The hostname of the request
            origin: req.headers.origin || 'unknown',
            referer: req.headers.referer || 'unknown',
            userAgent: req.headers['user-agent'],
            test: [
                req.ip,
                req.connection.remoteAddress,
                req.headers['x-forwarded-for']
            ]
        }
    }
}
