import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

// custom param decorator
export const CurrentAccount = createParamDecorator(
    (data: any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>()
        return request.account
    }
)
