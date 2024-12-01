import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDatabase1733045657797 implements MigrationInterface {
    name = 'InitDatabase1733045657797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "roles" ("id" integer NOT NULL, "roleName" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "approvals" ("id" SERIAL NOT NULL, "approvalStatus" character varying NOT NULL DEFAULT 'pending', "submissionDate" TIMESTAMP NOT NULL DEFAULT now(), "sellerId" integer, "productId" integer, CONSTRAINT "REL_bbdb39d9728965c695ac668d42" UNIQUE ("productId"), CONSTRAINT "PK_690417aaefa84d18b1a59e2a499" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "cart_item" ("cartId" integer NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_86ecfe066ef04fcf69bdbae722b" PRIMARY KEY ("cartId", "productId"))`
        )
        await queryRunner.query(
            `CREATE TABLE "carts" ("id" SERIAL NOT NULL, "buyerId" integer, CONSTRAINT "REL_02f9982fb9594702cb76f55f7b" UNIQUE ("buyerId"), CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "order_item" ("orderId" integer NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_7e383dc486afc7800bf87d1c11a" PRIMARY KEY ("orderId", "productId"))`
        )
        await queryRunner.query(
            `CREATE TABLE "payments" ("id" SERIAL NOT NULL, "paymentAmount" integer NOT NULL, "paymentStatus" integer NOT NULL DEFAULT '0', "paymentMethod" character varying NOT NULL, "paymentDate" TIMESTAMP, "orderId" integer NOT NULL, CONSTRAINT "REL_af929a5f2a400fdb6913b4967e" UNIQUE ("orderId"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "shippings" ("id" SERIAL NOT NULL, "shippingStatus" character varying NOT NULL DEFAULT 'waiting to be packed', "city" character varying NOT NULL, "district" character varying NOT NULL, "street" character varying NOT NULL, "shippingDate" TIMESTAMP NOT NULL DEFAULT now(), "deliveryDate" TIMESTAMP, "orderId" integer NOT NULL, CONSTRAINT "REL_c5a685f76b80f7eb0d143cc7d5" UNIQUE ("orderId"), CONSTRAINT "PK_665fb613135782a598a2b47e5b2" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "funds" ("fundId" SERIAL NOT NULL, "balance" integer NOT NULL, "sellerId" integer, CONSTRAINT "REL_2f740bc0d102b32ffe70d42763" UNIQUE ("sellerId"), CONSTRAINT "PK_e79f7261707b23dc184ea0e08dc" PRIMARY KEY ("fundId"))`
        )
        await queryRunner.query(
            `CREATE TABLE "fund_transactions" ("transactionId" SERIAL NOT NULL, "creditAmount" numeric NOT NULL, "creditStatus" integer NOT NULL, "fundId" integer, "orderId" integer, CONSTRAINT "PK_6788e51de86d9c3d5b30c352d2f" PRIMARY KEY ("transactionId"))`
        )
        await queryRunner.query(
            `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "totalAmount" integer NOT NULL, "orderStatus" character varying NOT NULL DEFAULT 'pending', "orderDate" TIMESTAMP NOT NULL DEFAULT now(), "completionDate" TIMESTAMP, "buyerId" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying, "passwordHash" character varying, "name" character varying NOT NULL, "avatar" bytea, "googleId" character varying, "roleId" integer, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "ratingStar" integer NOT NULL, "comment" character varying NOT NULL, "productId" integer, "buyerId" integer, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "brands" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "images" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "productId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "stockQuantity" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'new', "sellerId" integer NOT NULL, "brandId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "specifications" ("id" SERIAL NOT NULL, "cpu" character varying NOT NULL, "ram" character varying NOT NULL, "storage" character varying NOT NULL, "gpu" character varying NOT NULL, "display" character varying NOT NULL, "port" character varying NOT NULL, "keyboard" character varying NOT NULL, "lan" character varying NOT NULL, "wifi" character varying NOT NULL, "bluetooth" character varying NOT NULL, "webcam" character varying NOT NULL, "os" character varying NOT NULL, "battery" character varying NOT NULL, "weight" integer NOT NULL, "color" character varying NOT NULL, "dimensions" character varying NOT NULL, "productId" integer, CONSTRAINT "REL_ca8bf583b276dc74f594f73d24" UNIQUE ("productId"), CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "sessions" ("expiredAt" bigint NOT NULL, "id" character varying(255) NOT NULL, "json" text NOT NULL, "destroyedAt" TIMESTAMP, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE INDEX "IDX_4c1989542e47d9e3b98fe32c67" ON "sessions" ("expiredAt") `
        )
        await queryRunner.query(
            `ALTER TABLE "approvals" ADD CONSTRAINT "FK_a76909f3a2263e31a2663511db6" FOREIGN KEY ("sellerId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "approvals" ADD CONSTRAINT "FK_bbdb39d9728965c695ac668d421" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_29e590514f9941296f3a2440d39" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "carts" ADD CONSTRAINT "FK_02f9982fb9594702cb76f55f7be" FOREIGN KEY ("buyerId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "payments" ADD CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "shippings" ADD CONSTRAINT "FK_c5a685f76b80f7eb0d143cc7d59" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "funds" ADD CONSTRAINT "FK_2f740bc0d102b32ffe70d42763e" FOREIGN KEY ("sellerId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "fund_transactions" ADD CONSTRAINT "FK_3b734c4ed85bb1a35a0a5071b8c" FOREIGN KEY ("fundId") REFERENCES "funds"("fundId") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "fund_transactions" ADD CONSTRAINT "FK_797d0fe9cdc4241fc15fd89dc71" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "orders" ADD CONSTRAINT "FK_9877ffd9a491c3e82f5b32d4f4d" FOREIGN KEY ("buyerId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "accounts" ADD CONSTRAINT "FK_fb8505547017736dcb551014c17" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "ratings" ADD CONSTRAINT "FK_abcea824a43708933e5ac15a0e4" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "ratings" ADD CONSTRAINT "FK_779585ed3f5006c3067fe36d039" FOREIGN KEY ("buyerId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "images" ADD CONSTRAINT "FK_7af50639264735c79e918af6089" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "products" ADD CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6" FOREIGN KEY ("sellerId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "specifications" ADD CONSTRAINT "FK_ca8bf583b276dc74f594f73d24e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `INSERT INTO "roles" VALUES (0, 'buyer'), (1, 'seller'), (2, 'admin')`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "specifications" DROP CONSTRAINT "FK_ca8bf583b276dc74f594f73d24e"`
        )
        await queryRunner.query(
            `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`
        )
        await queryRunner.query(
            `ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`
        )
        await queryRunner.query(
            `ALTER TABLE "products" DROP CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6"`
        )
        await queryRunner.query(
            `ALTER TABLE "images" DROP CONSTRAINT "FK_7af50639264735c79e918af6089"`
        )
        await queryRunner.query(
            `ALTER TABLE "ratings" DROP CONSTRAINT "FK_779585ed3f5006c3067fe36d039"`
        )
        await queryRunner.query(
            `ALTER TABLE "ratings" DROP CONSTRAINT "FK_abcea824a43708933e5ac15a0e4"`
        )
        await queryRunner.query(
            `ALTER TABLE "accounts" DROP CONSTRAINT "FK_fb8505547017736dcb551014c17"`
        )
        await queryRunner.query(
            `ALTER TABLE "orders" DROP CONSTRAINT "FK_9877ffd9a491c3e82f5b32d4f4d"`
        )
        await queryRunner.query(
            `ALTER TABLE "fund_transactions" DROP CONSTRAINT "FK_797d0fe9cdc4241fc15fd89dc71"`
        )
        await queryRunner.query(
            `ALTER TABLE "fund_transactions" DROP CONSTRAINT "FK_3b734c4ed85bb1a35a0a5071b8c"`
        )
        await queryRunner.query(
            `ALTER TABLE "funds" DROP CONSTRAINT "FK_2f740bc0d102b32ffe70d42763e"`
        )
        await queryRunner.query(
            `ALTER TABLE "shippings" DROP CONSTRAINT "FK_c5a685f76b80f7eb0d143cc7d59"`
        )
        await queryRunner.query(
            `ALTER TABLE "payments" DROP CONSTRAINT "FK_af929a5f2a400fdb6913b4967e1"`
        )
        await queryRunner.query(
            `ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`
        )
        await queryRunner.query(
            `ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`
        )
        await queryRunner.query(
            `ALTER TABLE "carts" DROP CONSTRAINT "FK_02f9982fb9594702cb76f55f7be"`
        )
        await queryRunner.query(
            `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf"`
        )
        await queryRunner.query(
            `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_29e590514f9941296f3a2440d39"`
        )
        await queryRunner.query(
            `ALTER TABLE "approvals" DROP CONSTRAINT "FK_bbdb39d9728965c695ac668d421"`
        )
        await queryRunner.query(
            `ALTER TABLE "approvals" DROP CONSTRAINT "FK_a76909f3a2263e31a2663511db6"`
        )
        await queryRunner.query(
            `DROP INDEX "public"."IDX_4c1989542e47d9e3b98fe32c67"`
        )
        await queryRunner.query(`DROP TABLE "sessions"`)
        await queryRunner.query(`DROP TABLE "specifications"`)
        await queryRunner.query(`DROP TABLE "products"`)
        await queryRunner.query(`DROP TABLE "images"`)
        await queryRunner.query(`DROP TABLE "categories"`)
        await queryRunner.query(`DROP TABLE "brands"`)
        await queryRunner.query(`DROP TABLE "ratings"`)
        await queryRunner.query(`DROP TABLE "accounts"`)
        await queryRunner.query(`DROP TABLE "orders"`)
        await queryRunner.query(`DROP TABLE "fund_transactions"`)
        await queryRunner.query(`DROP TABLE "funds"`)
        await queryRunner.query(`DROP TABLE "shippings"`)
        await queryRunner.query(`DROP TABLE "payments"`)
        await queryRunner.query(`DROP TABLE "order_item"`)
        await queryRunner.query(`DROP TABLE "carts"`)
        await queryRunner.query(`DROP TABLE "cart_item"`)
        await queryRunner.query(`DROP TABLE "approvals"`)
        await queryRunner.query(`DROP TABLE "roles"`)
    }
}
