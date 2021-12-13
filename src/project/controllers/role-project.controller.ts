import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleDTO } from 'src/user/dto/role.dto';
import { RoleProjectEntity } from '../entity/role-project.entity';
import { RoleProjectService } from '../services/role-project.service';

@Controller('role-project')
export class RoleProjectController {
  constructor(private readonly roleProjectService: RoleProjectService) {}
  @Get()
  getAllRoleProjects(): Promise<RoleProjectEntity[]> {
    return this.roleProjectService.findAll();
  }

  @Get(':id')
  getRoleProject(@Param('id') id: string): Promise<RoleProjectEntity> {
    return this.roleProjectService.findOne(
      id,
      `El rol de proyecto con el ID: ${id} no existe`,
    );
  }

  @Post()
  createRoleProject(
    @Body() visibilityDTO: RoleDTO,
  ): Promise<RoleProjectEntity> {
    return this.roleProjectService.create(visibilityDTO);
  }
}
