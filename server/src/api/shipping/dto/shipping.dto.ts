import { IsString } from 'class-validator'

export class CreateShippingDto {
    @IsString()
    city: string

    @IsString()
    district: string

    @IsString()
    street: string
}
