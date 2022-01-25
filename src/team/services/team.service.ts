import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/config/service/base.service';
import { RoleType } from 'src/user/dto/role.dto';
import { RoleEntity } from 'src/user/entity/role.entity';
import { RoleRepository } from 'src/user/repository/role.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { RoleTeamEntity } from '../entity/role-team.entity';
import { TeamEntity } from '../entity/team.entity';
import { ObjectTeam, ObjectTeamAddRole } from '../interfaces/role-user-team';
import { RoleTeamRepository } from '../repository/role.team.repository';
import { TeamRepository } from '../repository/team.repository';

export class TeamService extends BaseService<TeamEntity> {
  constructor(
    @InjectRepository(TeamRepository)
    private readonly teamRepository: TeamRepository,
    private readonly roleTeamRepository: RoleTeamRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(teamRepository);
  }

  findTeamWithDetails(id: string): Promise<TeamEntity> {
    return this.teamRepository.findOne(id, {
      relations: ['usersIntoTeam', 'usersIntoTeam.user'],
    });
  }

  findTeamWithProjects(id: string): Promise<TeamEntity> {
    return this.teamRepository.findOne(id, {
      relations: ['projects'],
    });
  }

  async createTeamByUser(bodyTeam: any, id: string | any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['roleType'],
    });

    //console.log(user);

    try {
      if (user) {
        if (user.roleType === null || user.roleType === undefined) {
          throw new UnauthorizedException(
            'Este usuario no tiene permisos para crear el equipo',
          );
        } else {
          const isAdmin = await this.roleRepository.findOne({
            where: { id: user.roleType.id },
          });
          //console.log(isAdmin);
          if (isAdmin.roleType === RoleType.ADMIN) {
            const team = await this.teamRepository.save(bodyTeam);

            const teamId: any = await this.teamRepository.findOne({
              where: { id: team.id },
            });

            const body: ObjectTeam = {
              role: isAdmin,
              user: id,
              team: teamId.id,
            };

            await this.roleTeamRepository.save(body);
            return team;
          } else {
            throw new UnauthorizedException(
              'Este usuario no tiene permisos para crear el equipo',
            );
          }
        }
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  async addRoleAndTeamToUser(
    userId: string,
    teamId: string | any,
    bodyIds: ObjectTeamAddRole,
  ): Promise<RoleTeamEntity> {
    const userHaveAdminRole = await this.roleTeamRepository
      .createQueryBuilder('userAdmin')
      .leftJoinAndSelect('userAdmin.user', 'user')
      .leftJoinAndSelect('userAdmin.team', 'team')
      .where('userAdmin.user = :userId', { userId: userId })
      .andWhere('userAdmin.team = :teamId', { teamId: teamId })
      .innerJoin('userAdmin.role', 'role', 'role.roleType = :roleType', {
        roleType: RoleType.ADMIN,
      })
      .getOne();

    const userIsAdminGlobal = await (
      await this.userRepository.findOne(userId, { relations: ['roleType'] })
    ).roleType.roleType;

    try {
      if (userHaveAdminRole || userIsAdminGlobal === RoleType.ADMIN) {
        const roleAndTeamBody: ObjectTeam = {
          role: bodyIds.role,
          user: bodyIds.user,
          team: teamId,
        };
        return this.roleTeamRepository.save(roleAndTeamBody);
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
