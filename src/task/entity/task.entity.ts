import { BaseEntity } from 'src/config/entity/base.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StatusEntity } from './status.entity';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity {
  @Column({ nullable: false, length: 200 })
  title: string;

  @Column({ nullable: true, length: 3000 })
  description: string;

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateStart: Date;

  @Column({ nullable: true })
  dateEnd: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasksCreate)
  @JoinColumn({ name: 'creator_user_id' })
  creatorUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasksResponsable)
  @JoinColumn({ name: 'responsable_user_id' })
  responsableUser: UserEntity;

  @ManyToOne(() => StatusEntity, (status) => status.tasks)
  @JoinColumn({ name: 'status_id' })
  status: StatusEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;
}
