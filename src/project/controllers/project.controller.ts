import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProjectDTO } from '../dto/project.dto';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectService } from '../services/project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  getAllProjects(): Promise<ProjectEntity[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  getProject(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectService.findOne(
      id,
      `El proyecto con el ID: ${id} no existe`,
    );
  }

  @Get('withdetails/:id')
  getProjectWithDetails(@Param('id') id: string): Promise<ProjectEntity> {
    return this.projectService.findProjectWithDetails(id);
  }

  @Post()
  createProject(@Body() projectDTO: ProjectDTO): Promise<ProjectEntity> {
    return this.projectService.create(projectDTO);
  }

  @Patch('update/:id')
  updateProject(
    @Param('id') id: string,
    @Body() projectDTO: ProjectDTO,
  ): Promise<ProjectEntity> {
    return this.projectService.update(id, projectDTO);
  }
}
