import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleDTO } from '../dto/role.dto';
import { CreateUserDTO, UserDTO } from '../dto/user.dto';
import { RoleEntity } from '../entity/role.entity';
import { UserEntity } from '../entity/user.entity';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllUsers(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @Post()
  createUser(@Body() createRoleDTO: RoleDTO): Promise<RoleEntity> {
    return this.roleService.create(createRoleDTO);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<RoleEntity> {
    return this.roleService.findOne(id);
  }
}
