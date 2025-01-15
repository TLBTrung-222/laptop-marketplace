import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePaymentShippingCascade1736012912469 implements MigrationInterface {
    name = 'UpdatePaymentShippingCascade1736012912469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1"`);
        await queryRunner.query(`ALTER TABLE "shippings" DROP CONSTRAINT "FK_c5a685f76b80f7eb0d143cc7d59"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shippings" ADD CONSTRAINT "FK_c5a685f76b80f7eb0d143cc7d59" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shippings" DROP CONSTRAINT "FK_c5a685f76b80f7eb0d143cc7d59"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1"`);
        await queryRunner.query(`ALTER TABLE "shippings" ADD CONSTRAINT "FK_c5a685f76b80f7eb0d143cc7d59" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
