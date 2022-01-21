import { TeamEntity } from 'src/team/entity/team.entity';
import { RoleEntity } from '../../user/entity/role.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { ProjectEntity } from '../entity/project.entity';

export interface ObjectProject {
  role: RoleEntity;

  user: UserEntity;

  project: ProjectEntity;

  team: TeamEntity;
}
