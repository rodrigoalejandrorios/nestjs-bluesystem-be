import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
