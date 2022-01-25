import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectDTO } from '../dto/project.dto';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectService } from '../services/project.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { RoleType } from '../../user/dto/role.dto';
import { Roles } from '../../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get()
  getAllProjects(): Promise<ProjectEntity[]> {
    return this.projectService.findAll();
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get(':id')
  getProject(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectService.findOne(
      id,
      `El proyecto con el ID: ${id} no existe`,
    );
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get('withdetails/:id')
  getProjectWithDetails(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectService.findProjectWithDetails(id);
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Post('user/:userId/team/:teamId')
  createProject(
    @Param('userId') userId: string,
    @Param('teamId') teamId: string,
    @Body() projectDTO: ProjectDTO,
  ): Promise<ProjectEntity> {
    return this.projectService.createProjectByUserAndTeam(
      userId,
      teamId,
      projectDTO,
    );
  }

  @Roles(RoleType.ADMIN)
  @Patch('update/:id')
  updateProject(
    @Param('id') id: string,
    @Body() projectDTO: ProjectDTO,
  ): Promise<ProjectEntity> {
    return this.projectService.update(id, projectDTO);
  }
}
