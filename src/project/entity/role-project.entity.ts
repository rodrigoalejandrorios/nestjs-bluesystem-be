import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/entity/base.entity';
import { RoleEntity } from 'src/user/entity/role.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ProjectEntity } from './project.entity';
import { TeamEntity } from 'src/team/entity/team.entity';

@Entity({ name: 'role_projects' })
export class RoleProjectEntity extends BaseEntity {
  @ManyToOne(() => RoleEntity, (role) => role.roleProjectType)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne(() => UserEntity, (user) => user.projects)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.roleProjectType)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @ManyToOne(() => TeamEntity, (team) => team.projects)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;
}
