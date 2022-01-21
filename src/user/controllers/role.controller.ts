import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleDTO } from '../dto/role.dto';
import { RoleEntity } from '../entity/role.entity';
import { RoleService } from '../services/role.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PublicRoute } from 'src/auth/decorators/public.decorator';

//@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllUsers(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @Post()
  createUser(@Body() createRoleDTO: RoleDTO[]): Promise<RoleEntity> {
    let arrayRoles = [];
    arrayRoles.push(...createRoleDTO);
    return this.roleService.create(arrayRoles);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<RoleEntity> {
    return this.roleService.findOne(id);
  }
}
