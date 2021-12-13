import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './repositories/task.repository';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { StatusRepository } from './repositories/status.repository';
import { StatusController } from './controllers/status.controller';
import { StatusService } from './services/status.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, StatusRepository])],
  controllers: [TaskController, StatusController],
  providers: [TaskService, StatusService],
  exports: [TaskService, StatusService],
})
export class TaskModule {}
