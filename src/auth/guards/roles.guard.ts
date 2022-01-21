import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleType } from 'src/user/dto/role.dto';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../interfaces/token.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<RoleType[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();
    const user = req.user as PayloadToken;

    const isAuth = roles.some((role) => {
      return role === user.role;
    });
    if (!isAuth) {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta accion',
      );
    }
    return isAuth;
  }
}
