import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskStatusDTO } from '../dto/status.dto';
import { TaskDTO } from '../dto/task.dto';

import { TaskEntity } from '../entity/task.entity';
import { TaskService } from '../services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTasks(): Promise<TaskEntity[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.findOne(
      id,
      `La tarea con el ID: ${id} no existe o es erronea`,
    );
  }

  @Get('withdetails/:id')
  @HttpCode(HttpStatus.OK)
  getTaskWithDetails(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.findOneWithDetail(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: TaskDTO): Promise<TaskEntity> {
    return this.tasksService.create(createTaskDTO);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: TaskStatusDTO,
  ): Promise<TaskDTO> {
    const { name } = updateTaskStatus;
    return this.tasksService.update(id, name);
  }
}
