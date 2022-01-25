import { BaseEntity } from 'src/config/entity/base.entity';
import { TaskEntity } from 'src/task/entity/task.entity';
import { TeamEntity } from 'src/team/entity/team.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
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

  @ManyToOne(() => TeamEntity, (team) => team.projects)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;

  @OneToMany(() => RoleProjectEntity, (role) => role.project)
  roleProjectType: RoleProjectEntity[];

  //Relacion con tareas
  @OneToMany(() => TaskEntity, (tasks) => tasks.project)
  tasks: TaskEntity[];
}
