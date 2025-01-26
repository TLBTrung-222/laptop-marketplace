import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountEntity } from 'src/database/entities/account.entity'
import { ImageEntity } from 'src/database/entities/image.entity'
import { Repository } from 'typeorm'

@Injectable()
export class S3Service {
    private s3: S3Client
    private bucketName: string
    constructor(
        private configService: ConfigService,
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(ImageEntity)
        private imageRepository: Repository<ImageEntity>
    ) {
        this.s3 = new S3Client({
            credentials: {
                accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: configService.get('AWS_SECRET_KEY_ID')
            },
            region: configService.get('BUCKET_REGION')
        })
        this.bucketName = configService.get('BUCKET_NAME')
    }

    async uploadImage(
        prefix: 'avatars' | 'products',
        key: string,
        image: Buffer,
        mimeType: string
    ) {
        try {
            // send image to 'avatars' folder in s3
            const keyPrefix = prefix + '/' + key
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: keyPrefix,
                Body: image,
                ContentType: mimeType
            })

            await this.s3.send(command)

            return keyPrefix
        } catch (error) {
            throw new HttpException('Error when uploading image', 500)
        }
    }

    async getImageSignedUrl(key: string) {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: key
            })

            const url = await getSignedUrl(this.s3, command, {
                expiresIn: 60 * 60
            }) // 1 hour

            return url
        } catch (error) {
            throw new HttpException('Error when uploading image', 500)
        }
    }

    async deleteImage(key: string) {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key
            })

            await this.s3.send(command)
        } catch (error) {
            throw new HttpException('Error when uploading image', 500)
        }
    }
}
