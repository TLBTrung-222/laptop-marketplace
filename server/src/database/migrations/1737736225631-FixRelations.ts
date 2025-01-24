import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1737736225631 implements MigrationInterface {
    name = 'FixRelations1737736225631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specifications" DROP CONSTRAINT "FK_ca8bf583b276dc74f594f73d24e"`);
        await queryRunner.query(`ALTER TABLE "specifications" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "specifications" ADD "weight" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specifications" ADD CONSTRAINT "FK_ca8bf583b276dc74f594f73d24e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specifications" DROP CONSTRAINT "FK_ca8bf583b276dc74f594f73d24e"`);
        await queryRunner.query(`ALTER TABLE "specifications" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "specifications" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specifications" ADD CONSTRAINT "FK_ca8bf583b276dc74f594f73d24e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
