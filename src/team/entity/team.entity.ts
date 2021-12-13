import { BaseEntity } from 'src/config/entity/base.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'teams' })
export class TeamEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.teams)
  @JoinTable({ name: 'teams_users' })
  users: UserEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.team)
  projects: ProjectEntity[];
}
