import { BaseEntity } from 'src/config/entity/base.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { RoleProjectEntity } from 'src/project/entity/role-project.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RoleTeamEntity } from './role-team.entity';

@Entity({ name: 'teams' })
export class TeamEntity extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => RoleProjectEntity, (project) => project.team)
  projects: ProjectEntity[];

  @OneToMany(() => RoleTeamEntity, (roleType) => roleType.team)
  usersIntoTeam: ProjectEntity[];
}
