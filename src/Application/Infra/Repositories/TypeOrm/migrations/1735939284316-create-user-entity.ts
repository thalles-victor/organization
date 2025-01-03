import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserEntity1735939284316 implements MigrationInterface {
    name = 'CreateUserEntity1735939284316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(20) NOT NULL DEFAULT 'USER', "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_b38c575d28881ee352e679838c6" PRIMARY KEY ("id", "name", "email", "password", "role"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
