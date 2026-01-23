import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { NewsStatus } from '@prisma/client';

registerEnumType(NewsStatus, {
  name: 'NewsStatus',
});

@ObjectType()
export class NewsModel {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field(() => String, { nullable: true })
  summary?: string | null;

  @Field()
  content: string;

  @Field(() => NewsStatus)
  status: NewsStatus;

  @Field(() => GraphQLISODateTime, { nullable: true })
  publishedAt?: Date | null;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
