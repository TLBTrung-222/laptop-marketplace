import { Module } from '@nestjs/common'
import { AccountModule } from './account/account.module'
import { CategoryModule } from './category/category.module'
import { BrandModule } from './brand/brand.module'
import { ProductModule } from './product/product.module'
import { OrderModule } from './order/order.module'
import { CartModule } from './cart/cart.module'
import { RatingModule } from './rating/rating.module'
import { FundModule } from './fund/fund.module'
import { AdminModule } from './admin/admin.module'
import { ShippingModule } from './shipping/shipping.module'
import { AuthModule } from './auth/auth.module'
import { ApprovalModule } from './approval/approval.module'
import { PaymentModule } from './payment/payment.module'

@Module({
    imports: [
        AccountModule,
        AuthModule,
        BrandModule,
        CategoryModule,
        ProductModule,
        OrderModule,
        CartModule,
        RatingModule,
        FundModule,
        AdminModule,
        ShippingModule,
        ApprovalModule,
        PaymentModule
    ]
})
export class ApiModule {}
