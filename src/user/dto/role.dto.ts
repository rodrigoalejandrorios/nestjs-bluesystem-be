import { IsNotEmpty } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';

export enum RoleType {
  STAKEHOLDER = 'STAKEHOLDER',
  VIEWER = 'VIEWER',
  BASIC = 'BASIC',
  ADMIN = 'ADMIN',
}

export class RoleDTO extends AbstractDto {
  @IsNotEmpty()
  type: string;
  @IsNotEmpty()
  roleType: RoleType;
}
