import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpecificationEntity } from "src/database/entities/specification.entity";
import { SpecificationService } from "./service/specification.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SpecificationEntity
        ]),    ],
    controllers: [],
    providers: [SpecificationService],
    exports: [SpecificationService]
})
export class SpecificationModule {}
