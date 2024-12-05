import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImageStoring1733368712463 implements MigrationInterface {
    name = 'UpdateImageStoring1733368712463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "avatar" bytea`);
    }

}
