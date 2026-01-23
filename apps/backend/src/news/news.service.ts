import { Injectable } from '@nestjs/common';
import { NewsStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async listNews(take = 4, status: NewsStatus = NewsStatus.PUBLISHED) {
    return this.prisma.news.findMany({
      where: { status },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take,
    });
  }
}
