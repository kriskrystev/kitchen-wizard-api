import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

function matchRoles(requiredRoles: string[], providedRoles: string[]) {
  let match = true;

  for (let i = 0; i < requiredRoles.length; i++) {
    const requiredRole = requiredRoles[i];

    if (!providedRoles.includes(requiredRole)) {
      match = false;
      break;
    }
  }

  return match;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return matchRoles(roles, user.roles);
  }
}
