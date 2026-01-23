import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { NewsStatus } from '@prisma/client';
import { NewsModel } from './news.model';
import { NewsService } from './news.service';

@Resolver(() => NewsModel)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Query(() => [NewsModel])
  news(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('status', { type: () => NewsStatus, nullable: true }) status?: NewsStatus,
  ) {
    return this.newsService.listNews(take ?? 4, status ?? NewsStatus.PUBLISHED);
  }
}
