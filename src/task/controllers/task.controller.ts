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
import { TaskDTO, TaskUpdateDTO } from '../dto/task.dto';
import { TaskEntity } from '../entity/task.entity';
import { TaskService } from '../services/task.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RoleType } from 'src/user/dto/role.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllTasks(): Promise<TaskEntity[]> {
    return this.tasksService.findAll();
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTaskById(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.findOne(
      id,
      `La tarea con el ID: ${id} no existe o es erronea`,
    );
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get('withdetails/:id')
  @HttpCode(HttpStatus.OK)
  getTaskWithDetails(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.findOneWithDetail(id);
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
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

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTasks: TaskUpdateDTO,
  ): Promise<TaskDTO> {
    return this.tasksService.update(id, updateTasks);
  }
}
