import { IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from '../../config/dto/base-dto';
import { RoleType, RoleDTO } from './role.dto';

export class CreateUserDTO extends AbstractDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  address?: string;
  @IsNotEmpty()
  roleType: RoleDTO;
}

export class UserDTO extends AbstractDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  address?: string;
}
