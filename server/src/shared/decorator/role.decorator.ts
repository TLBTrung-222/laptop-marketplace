import { SetMetadata } from '@nestjs/common'
import { RoleId } from 'src/api/role/enum/role.enum'

export const Role = (roleId: RoleId) => SetMetadata('roleId', roleId)
