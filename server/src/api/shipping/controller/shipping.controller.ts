import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('shipping')
@Controller('orders')
export class ShippingController {}
