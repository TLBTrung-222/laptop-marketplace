import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('funds')
@Controller('seller/fund')
export class FundController {}
