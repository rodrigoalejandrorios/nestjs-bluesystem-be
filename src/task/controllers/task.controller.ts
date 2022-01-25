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
import { ProjectEntity } from 'src/project/entity/project.entity';
import { TaskStatusDTO } from '../dto/status.dto';
import { TaskDTO, TaskUpdateDTO } from '../dto/task.dto';

import { TaskEntity } from '../entity/task.entity';
import { TaskService } from '../services/task.service';

@Controller('tasks')
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

  @Post('userCreator/:userId/project/:projectId')
  createTask(
    @Param('userId') userId,
    @Param('projectId') projectId: ProjectEntity,
    @Body() createTaskDTO: TaskDTO,
  ): Promise<TaskEntity> {
    return this.tasksService.createTaskByUserIntoTeam(
      userId,
      projectId,
      createTaskDTO,
    );
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTasks: TaskUpdateDTO,
  ): Promise<TaskDTO> {
    return this.tasksService.update(id, updateTasks);
  }
}
