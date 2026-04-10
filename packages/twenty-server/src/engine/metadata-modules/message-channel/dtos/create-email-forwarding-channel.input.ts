import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('CreateEmailForwardingChannelInput')
export class CreateEmailForwardingChannelInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  handle: string;
}
