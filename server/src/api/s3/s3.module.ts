import { Module } from '@nestjs/common'
import { S3Service } from './service/s3.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { ImageEntity } from 'src/database/entities/image.entity'

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity, ImageEntity])],
    providers: [S3Service],
    exports: [S3Service]
})
export class S3Module {}
