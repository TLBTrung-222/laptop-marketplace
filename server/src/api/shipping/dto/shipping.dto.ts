import { IsEnum, IsOptional, IsString } from 'class-validator'
import { ShippingStatus } from 'src/shared/enum/shipping.enum'

export class CreateShippingDto {
    @IsString()
    city: string

    @IsString()
    district: string

    @IsString()
    street: string
}

export class UpdateShippingDto {
    @IsOptional()
    @IsString()
    city?: string

    @IsOptional()
    @IsString()
    district?: string

    @IsOptional()
    @IsString()
    street?: string
}

export class UpdateShippingStatusDto {
    @IsEnum(ShippingStatus)
    status: ShippingStatus
}
