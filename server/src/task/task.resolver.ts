import { Task, TaskCreateInput } from '@generated/prisma-graphql/task';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/current-user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-guard';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => Task)
export class TaskResolver {
  constructor(private readonly $prismaService: PrismaService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query((returns) => [Task])
  public async userTasks(@CurrentUser() user: User): Promise<Task[] | null> {
    return await this.$prismaService.task.findMany({
      where: {
        authorId: {
          equals: user.id,
        },
      },
    });
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation((returns) => Task)
  public async createTask(
    @Args('where', { type: () => TaskCreateInput }) data: TaskCreateInput,
    @CurrentUser() user: User,
  ): Promise<Task | null> {
    return await this.$prismaService.task.create({
      data: {
        ...data,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }
}
