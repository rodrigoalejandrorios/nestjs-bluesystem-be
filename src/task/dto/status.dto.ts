import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';
import { TaskDTO } from './task.dto';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}

export class TaskStatusDTO extends AbstractDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  mode: TaskStatus;

  @IsOptional()
  tasks?: TaskDTO[];
}
