import {MigrationInterface, QueryRunner} from "typeorm";

export class UserInit1634241836472 implements MigrationInterface {
    name = 'UserInit1634241836472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar NOT NULL, "description" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
