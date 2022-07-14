import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  public getRequest(context: ExecutionContext) {
    const context_ = GqlExecutionContext.create(context);
    return context_.getContext().req;
  }
}
