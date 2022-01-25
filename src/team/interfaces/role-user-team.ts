import { RoleEntity } from 'src/user/entity/role.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { TeamEntity } from '../entity/team.entity';

export interface ObjectTeam {
  role: RoleEntity;
  user: UserEntity;
  team: TeamEntity;
}
export interface ObjectTeamAddRole {
  role: RoleEntity;
  user: UserEntity;
}
