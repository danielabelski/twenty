import { Field, ObjectType } from '@nestjs/graphql';

import { IDField } from '@ptc-org/nestjs-query-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UUIDScalarType } from 'src/engine/api/graphql/workspace-schema-builder/graphql-types/scalars';

@Entity({ name: 'signingKey', schema: 'core' })
@ObjectType('SigningKey')
export class SigningKeyEntity {
  @IDField(() => UUIDScalarType)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  kid: string;

  @Column({ type: 'text' })
  publicKey: string;

  @Column({ type: 'text', nullable: true })
  privateKey: string | null;

  @Field()
  @Column({ type: 'varchar', default: 'ES256' })
  algorithm: string;

  @Field()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Field(() => Boolean)
  get hasPrivateKey(): boolean {
    return this.privateKey !== null;
  }

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  rotatedAt: Date | null;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  retiredAt: Date | null;
}
