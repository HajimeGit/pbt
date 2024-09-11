import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTransactionAmountColumn1725700323386 implements MigrationInterface {
    name = 'UpdateTransactionAmountColumn1725700323386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`amount\` decimal(6,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`amount\` int NOT NULL`);
    }

}
