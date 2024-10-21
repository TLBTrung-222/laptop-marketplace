import { Module } from '@nestjs/common'
import { FundController } from './controller/fund.controller'

@Module({ controllers: [FundController] })
export class FundModule {}
