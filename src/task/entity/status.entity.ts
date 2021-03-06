import { BaseEntity } from 'src/config/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TaskStatus } from '../dto/status.dto';
import { TaskEntity } from './task.entity';

@Entity({ name: 'status' })
export class StatusEntity extends BaseEntity {
  @Column({ nullable: false })
  statusName: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
    nullable: false,
  })
  statusType: TaskStatus;

  @OneToMany(() => TaskEntity, (tasks) => tasks.status)
  tasks: TaskEntity[];
}
