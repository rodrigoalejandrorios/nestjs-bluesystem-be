import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TeamDTO } from '../dto/team.dto';
import { RoleTeamEntity } from '../entity/role-team.entity';
import { TeamEntity } from '../entity/team.entity';
import { TeamService } from '../services/team.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleType } from 'src/user/dto/role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get()
  getAllTeams(): Promise<TeamEntity[]> {
    return this.teamService.findAll();
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get(':id')
  getTeam(@Param('id') id: string): Promise<TeamEntity> {
    return this.teamService.findOne(
      id,
      `El proyecto con el ID: ${id} no existe`,
    );
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get('withdetails/:id')
  getTeamWithDetails(@Param('id') id: string): Promise<TeamEntity> {
    return this.teamService.findTeamWithDetails(id);
  }

  @Roles(RoleType.ADMIN)
  @Post(':id')
  createTeam(
    @Body() teamDTO: TeamDTO,
    @Param('id') id: string,
  ): Promise<TeamEntity> {
    return this.teamService.createTeamByUser(teamDTO, id);
  }

  @Roles(RoleType.ADMIN)
  @Post('add-user-into-team/:id')
  addUserIntoTeam(
    @Body() setIds,
    @Param('id') id: string,
  ): Promise<RoleTeamEntity[]> {
    return this.teamService.addRoleAndTeamToUser(id, setIds);
  }

  @Roles(RoleType.ADMIN)
  @Patch('update/:id')
  updateTeam(
    @Param('id') id: string,
    @Body() teamDTO: TeamDTO,
  ): Promise<TeamEntity> {
    return this.teamService.update(id, teamDTO);
  }
}
