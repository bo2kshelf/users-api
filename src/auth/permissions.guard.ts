import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {GqlExecutionContext} from '@nestjs/graphql';
import {METADATA_KEY} from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const routePermissions = this.reflector.get<string[]>(
      METADATA_KEY,
      context.getHandler(),
    );

    const ctx = GqlExecutionContext.create(context);
    const userPermissions = ctx.getContext().req.user.permissions;

    return (
      !routePermissions ||
      routePermissions.every((routePermission) =>
        userPermissions.includes(routePermission),
      )
    );
  }
}
