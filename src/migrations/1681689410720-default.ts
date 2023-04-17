import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1681689410720 implements MigrationInterface {
    name = 'Default1681689410720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "desciption" TO "description"`);
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "description" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms" RENAME COLUMN "description" TO "desciption"`);
    }

}
