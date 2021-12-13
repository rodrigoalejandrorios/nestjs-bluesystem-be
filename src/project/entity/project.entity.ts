import { BaseEntity } from 'src/config/entity/base.entity';
import { TaskEntity } from 'src/task/entity/task.entity';
import { TeamEntity } from 'src/team/entity/team.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { RoleProjectEntity } from './role-project.entity';
import { VisibilityEntity } from './visibility.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ length: 500, nullable: true })
  description?: string;

  @ManyToOne(() => VisibilityEntity, (visibility) => visibility.projects)
  @JoinColumn({ name: 'visibility_id' })
  visibility: VisibilityEntity;

  @OneToMany(() => RoleProjectEntity, (role) => role.projects)
  roleProjectType: RoleProjectEntity[];

  //Relacion con tareas
  @OneToMany(() => TaskEntity, (tasks) => tasks.project)
  tasks: TaskEntity[];

  @ManyToMany(() => UserEntity, (user) => user.projects)
  @JoinTable()
  users: UserEntity[];

  @ManyToOne(() => TeamEntity, (teams) => teams.projects)
  @JoinColumn({ name: 'teams_id' })
  team: TeamEntity;
}
