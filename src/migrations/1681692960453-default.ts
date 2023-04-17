import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1681692960453 implements MigrationInterface {
    name = 'Default1681692960453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ALTER COLUMN "description" SET NOT NULL`);
    }

}
