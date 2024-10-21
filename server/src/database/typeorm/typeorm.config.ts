// import { Injectable } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
// import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
// import { ReportEntity } from '../reports/report.entity'
// import { UserEntity } from '../users/user.entity'

// @Injectable()
// export class TypeOrmConfigService implements TypeOrmOptionsFactory {
//     constructor(private configService: ConfigService) {}

//     createTypeOrmOptions():
//         | Promise<TypeOrmModuleOptions>
//         | TypeOrmModuleOptions {
//         return {
//             type: 'sqlite',
//             database: this.configService.get('DB_NAME'),
//             entities: [UserEntity, ReportEntity],
//             synchronize: process.env.NODE_ENV === 'test' ? true : false,
//             migrationsRun: process.env.NODE_ENV === 'test' ? true : false
//         }
//     }
// }
