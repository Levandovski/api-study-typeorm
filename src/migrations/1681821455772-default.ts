import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1681821455772 implements MigrationInterface {
    name = 'Default1681821455772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "desciption" TO "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "description" TO "desciption"`);
    }

}
