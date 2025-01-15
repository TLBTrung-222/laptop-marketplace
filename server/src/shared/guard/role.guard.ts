import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { RoleId } from 'src/shared/enum/role.enum'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<RoleId[]>(
            'roleIds',
            [context.getHandler(), context.getClass()]
        )

        if (!requiredRoles) {
            return true
        }

        const request = context.switchToHttp().getRequest<Request>()
        const userRole = request.account.role.id

        return requiredRoles.includes(userRole)
    }
}
