import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/config/service/base.service';
import { RoleTeamRepository } from 'src/team/repository/role.team.repository';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectRepository } from '../repository/project.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { TeamRepository } from 'src/team/repository/team.repository';
import { ProjectDTO } from '../dto/project.dto';
import { RoleTeamEntity } from 'src/team/entity/role-team.entity';
import { ObjectProject } from '../interfaces/interface.project';
import { RoleRepository } from 'src/user/repository/role.repository';
import { RoleType } from 'src/user/dto/role.dto';
import { RoleProjectRepository } from '../repository/role-project.repository';

@Injectable()
export class ProjectService extends BaseService<ProjectEntity> {
  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectRepository: ProjectRepository,
    private readonly teamRepository: TeamRepository,
    private readonly roleTeamRepository: RoleTeamRepository,
    private readonly roleProjectRepository: RoleProjectRepository,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {
    super(projectRepository);
  }

  findProjectWithDetails(id: string): Promise<ProjectEntity> {
    return this.projectRepository.findOne(id, {
      relations: [
        'roleProjectType',
        'roleProjectType.user',
        'roleProjectType.team',
      ],
    });
  }

  async createProjectByUserAndTeam(
    userId,
    teamId,
    bodyProject: ProjectDTO,
  ): Promise<ProjectEntity> {
    const ifTeamExist = await this.teamRepository.findOne(teamId);
    //console.log(ifTeamExist);
    const userIsAdminGlobal = await (
      await this.userRepository.findOne(userId, { relations: ['roleType'] })
    ).roleType.roleType;

    const userHaveAdminRoleInTeam: RoleTeamEntity[] =
      await this.roleTeamRepository
        .createQueryBuilder('userAdmin')
        .where('userAdmin.user = :userId', { userId: userId })
        .innerJoin('userAdmin.role', 'role', 'role.roleType = :roleType', {
          roleType: 'ADMIN',
        })
        .getMany();

    try {
      if (userIsAdminGlobal === 'ADMIN') {
        if (ifTeamExist) {
          const isAdmin = await this.roleRepository.findOne({
            where: { roleType: RoleType.ADMIN },
          });
          const project = await this.projectRepository.save(bodyProject);
          const projectId: any = await this.projectRepository.findOne({
            where: { id: project.id },
          });

          const body: ObjectProject = {
            role: isAdmin,
            user: userId,
            project: projectId.id,
            team: teamId,
          };

          await this.roleProjectRepository.save(body);
          return project;
        }
      } else if (userHaveAdminRoleInTeam) {
        if (ifTeamExist) {
          const isAdmin = await this.roleRepository.findOne({
            where: { roleType: RoleType.ADMIN },
          });
          const project = await this.projectRepository.save(bodyProject);
          const projectId: any = await this.projectRepository.findOne({
            where: { id: project.id },
          });

          const body: ObjectProject = {
            role: isAdmin,
            user: userId,
            project: projectId.id,
            team: teamId.id,
          };

          await this.roleProjectRepository.save(body);
          return project;
        }
      } else {
        throw new UnauthorizedException(
          'No tienes permisos para determinada accion',
        );
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
