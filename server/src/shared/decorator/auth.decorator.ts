import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { RoleId } from '../enum/role.enum'
import { AuthGuard } from '../guard/auth.guard'
import { RoleGuard } from '../guard/role.guard'

export function Auth(roleIds: RoleId[]) {
    return applyDecorators(
        SetMetadata('roleIds', roleIds),
        UseGuards(AuthGuard, RoleGuard)
    )
}
