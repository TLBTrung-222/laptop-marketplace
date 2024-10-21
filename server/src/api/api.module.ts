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

@Module({
    imports: [
        AccountModule,
        BrandModule,
        CategoryModule,
        ProductModule,
        OrderModule,
        CartModule,
        RatingModule,
        FundModule,
        AdminModule,
        ShippingModule
    ]
})
export class ApiModule {}
