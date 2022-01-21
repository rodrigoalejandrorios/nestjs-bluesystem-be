import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/entity/base.entity';
import { RoleEntity } from 'src/user/entity/role.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { TeamEntity } from './team.entity';

@Entity({ name: 'role_teams' })
export class RoleTeamEntity extends BaseEntity {
  @ManyToOne(() => RoleEntity, (role) => role.roleTeamType)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne(() => UserEntity, (user) => user.teams)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => TeamEntity, (team) => team.usersIntoTeam)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;
}
