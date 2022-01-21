import { BaseEntity } from 'src/config/entity/base.entity';
import { TaskEntity } from 'src/task/entity/task.entity';
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

  @OneToMany(() => RoleProjectEntity, (role) => role.project)
  roleProjectType: RoleProjectEntity[];

  //Relacion con tareas
  @OneToMany(() => TaskEntity, (tasks) => tasks.project)
  tasks: TaskEntity[];
}
