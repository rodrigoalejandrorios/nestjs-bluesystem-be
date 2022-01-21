import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { RoleType } from '../../user/dto/role.dto';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RoleType[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
