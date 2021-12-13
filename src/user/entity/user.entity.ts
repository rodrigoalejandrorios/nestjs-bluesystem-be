import { BaseEntity } from 'src/config/entity/base.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { RoleProjectEntity } from 'src/project/entity/role-project.entity';
import { TaskEntity } from 'src/task/entity/task.entity';
import { TeamEntity } from 'src/team/entity/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => RoleEntity, (roleType) => roleType.users)
  @JoinColumn({ name: 'role_id' })
  roleType: RoleEntity;

  @ManyToMany(() => ProjectEntity, (project) => project.users)
  projects: ProjectEntity[];

  @ManyToMany(() => TeamEntity, (teams) => teams.users)
  teams: TeamEntity[];

  @OneToMany(() => RoleProjectEntity, (roleType) => roleType.users)
  roleProjectType: RoleProjectEntity[];

  @OneToMany(() => TaskEntity, (tasks) => tasks.user)
  tasks: TaskEntity[];
}
