import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddSigningKeyEntity1770400000000 implements MigrationInterface {
  name = 'AddSigningKeyEntity1770400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "core"."signingKey" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "kid" character varying NOT NULL,
        "publicKey" text NOT NULL,
        "privateKey" text,
        "algorithm" character varying NOT NULL DEFAULT 'ES256',
        "isActive" boolean NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "rotatedAt" TIMESTAMP WITH TIME ZONE,
        "retiredAt" TIMESTAMP WITH TIME ZONE,
        CONSTRAINT "PK_signingKey_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_signingKey_kid" UNIQUE ("kid")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "core"."signingKey"`);
  }
}
