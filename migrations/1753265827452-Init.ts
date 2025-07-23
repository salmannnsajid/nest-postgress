import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1753265827452 implements MigrationInterface {
    name = 'Init1753265827452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "profilePicture" character varying NOT NULL, "phoneNumber" character varying, "age" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_mosque" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "contactPerson" character varying, "phoneNumber" character varying, "notes" character varying, "status" character varying NOT NULL DEFAULT 'pending', CONSTRAINT "PK_b76fb9ca110a7499575860a5fc7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "request_mosque"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
