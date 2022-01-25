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
import { StatusEntity } from '../entity/status.entity';

import { StatusService } from '../services/status.service';

@Controller('status-task')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllStatus(): Promise<StatusEntity[]> {
    return this.statusService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getStatusById(@Param('id') id: string): Promise<StatusEntity> {
    return this.statusService.findOne(
      id,
      `El status con el ID: ${id} no existe o es erronea`,
    );
  }

  @Post()
  createStatus(
    @Body() createStatusDTO: TaskStatusDTO[],
  ): Promise<StatusEntity[]> {
    return this.statusService.createStatus(createStatusDTO);
  }

  @Delete(':id')
  deleteStatus(@Param('id') id: string) {
    return this.statusService.delete(id);
  }

  @Patch(':id/type')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: TaskStatusDTO,
  ): Promise<TaskStatusDTO> {
    const { statusName } = updateTaskStatus;
    return this.statusService.update(id, statusName);
  }
}
