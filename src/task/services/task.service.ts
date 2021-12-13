import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/config/service/base.service';
import { TaskEntity } from '../entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TaskService extends BaseService<TaskEntity> {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {
    super(taskRepository);
  }

  findOneWithDetail(id: string): Promise<TaskEntity> {
    return this.taskRepository.findOne(id, {
      relations: ['user', 'status', 'project'],
    });
  }
}
