import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => String)
  public getString(): string {
    return 'Hello';
  }
}
