import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { RoleId } from 'src/api/role/enum/role.enum'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRole = this.reflector.get<RoleId>(
            'roleId',
            context.getHandler()
        )

        console.log('required role from Role decorator: ' + requiredRole)
        return false
    }
}
