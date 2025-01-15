import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFK1733233019077 implements MigrationInterface {
    name = 'UpdateFK1733233019077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funds" DROP CONSTRAINT "FK_2f740bc0d102b32ffe70d42763e"`);
        await queryRunner.query(`ALTER TABLE "funds" ADD CONSTRAINT "FK_2f740bc0d102b32ffe70d42763e" FOREIGN KEY ("sellerId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funds" DROP CONSTRAINT "FK_2f740bc0d102b32ffe70d42763e"`);
        await queryRunner.query(`ALTER TABLE "funds" ADD CONSTRAINT "FK_2f740bc0d102b32ffe70d42763e" FOREIGN KEY ("sellerId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
