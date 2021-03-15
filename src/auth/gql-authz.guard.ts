import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {GqlExecutionContext} from '@nestjs/graphql';
import {PERMISSIONS_METADATA_KEY} from './permissions.decorator';

@Injectable()
export class GqlAuthzGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const gqlRequest = this.getRequest(context);
    const routePermissions =
      this.reflector.get<string[]>(
        PERMISSIONS_METADATA_KEY,
        context.getHandler(),
      ) || [];
    if (routePermissions.length === 0) return true;

    const userPermissions: string[] = gqlRequest.body.permissions;

    return routePermissions.every((routePermission) =>
      userPermissions.includes(routePermission),
    );
  }
}
