import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { ApiResponse } from '../../types'

export class SuccessResponseInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<ApiResponse> | Promise<Observable<ApiResponse>> {
        return next.handle().pipe(
            map((data: any) => {
                return {
                    isSuccess: true,
                    data: data || null,
                    errors: null
                }
            })
        )
    }
}
