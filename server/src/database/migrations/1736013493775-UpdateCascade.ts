import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascade1736013493775 implements MigrationInterface {
    name = 'UpdateCascade1736013493775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "fund_transactions" DROP CONSTRAINT "FK_3b734c4ed85bb1a35a0a5071b8c"`);
        await queryRunner.query(`ALTER TABLE "fund_transactions" DROP CONSTRAINT "FK_797d0fe9cdc4241fc15fd89dc71"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fund_transactions" ADD CONSTRAINT "FK_3b734c4ed85bb1a35a0a5071b8c" FOREIGN KEY ("fundId") REFERENCES "funds"("fundId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fund_transactions" ADD CONSTRAINT "FK_797d0fe9cdc4241fc15fd89dc71" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fund_transactions" DROP CONSTRAINT "FK_797d0fe9cdc4241fc15fd89dc71"`);
        await queryRunner.query(`ALTER TABLE "fund_transactions" DROP CONSTRAINT "FK_3b734c4ed85bb1a35a0a5071b8c"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "fund_transactions" ADD CONSTRAINT "FK_797d0fe9cdc4241fc15fd89dc71" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fund_transactions" ADD CONSTRAINT "FK_3b734c4ed85bb1a35a0a5071b8c" FOREIGN KEY ("fundId") REFERENCES "funds"("fundId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
