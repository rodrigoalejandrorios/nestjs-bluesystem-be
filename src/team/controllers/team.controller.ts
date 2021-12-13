import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TeamDTO } from '../dto/team.dto';
import { TeamEntity } from '../entity/team.entity';
import { TeamService } from '../services/team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
  @Get()
  getAllProjects(): Promise<TeamEntity[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  getProject(@Param('id') id: string): Promise<TeamEntity> {
    return this.teamService.findOne(
      id,
      `El proyecto con el ID: ${id} no existe`,
    );
  }

  @Get('withdetails/:id')
  getProjectWithDetails(@Param('id') id: string): Promise<TeamEntity> {
    return this.teamService.findProjectWithDetails(id);
  }

  @Post()
  createProject(@Body() teamDTO: TeamDTO): Promise<TeamEntity> {
    return this.teamService.create(teamDTO);
  }

  @Patch('update/:id')
  updateProject(
    @Param('id') id: string,
    @Body() teamDTO: TeamDTO,
  ): Promise<TeamEntity> {
    return this.teamService.update(id, teamDTO);
  }
}
