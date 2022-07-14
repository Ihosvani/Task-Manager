import { User } from '@generated/prisma-graphql/user';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-guard';
import { CurrentUser } from 'src/current-user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly $prismaServiceL: PrismaService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query((returns) => User)
  public async user(@CurrentUser() user: User): Promise<User | null> {
    return await this.$prismaServiceL.user.findFirst({
      where: {
        id: user.id,
      },
    });
  }
}
