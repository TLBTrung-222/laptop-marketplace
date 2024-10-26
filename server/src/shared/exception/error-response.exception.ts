import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    NotFoundException
} from '@nestjs/common'
import { Response } from 'express'
import { ApiResponse } from 'src/types'

@Catch(HttpException)
export class ErrorResponse implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const response = context.getResponse<Response>()
        const errorResponse = exception.getResponse()

        const responseBody: ApiResponse = {
            isSuccess: false,
            data: null,
            errors:
                typeof errorResponse === 'string'
                    ? errorResponse
                    : (errorResponse as any).message
        }

        response.status(exception.getStatus()).json(responseBody)
    }
}
