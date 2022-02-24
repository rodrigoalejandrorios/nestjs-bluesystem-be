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
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RoleType } from 'src/user/dto/role.dto';
import { TaskStatusDTO } from '../dto/status.dto';
import { StatusEntity } from '../entity/status.entity';
import { StatusService } from '../services/status.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('status-task')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllStatus(): Promise<StatusEntity[]> {
    return this.statusService.findAll();
  }

  @Roles(RoleType.ADMIN, RoleType.BASIC)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getStatusById(@Param('id') id: string): Promise<StatusEntity> {
    return this.statusService.findOne(
      id,
      `El status con el ID: ${id} no existe o es erronea`,
    );
  }

  @Roles(RoleType.ADMIN)
  @Post()
  createStatus(
    @Body() createStatusDTO: TaskStatusDTO[],
  ): Promise<StatusEntity[]> {
    return this.statusService.createStatus(createStatusDTO);
  }

  @Roles(RoleType.ADMIN)
  @Delete(':id')
  deleteStatus(@Param('id') id: string) {
    return this.statusService.delete(id);
  }

  @Roles(RoleType.ADMIN)
  @Patch(':id/type')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: TaskStatusDTO,
  ): Promise<TaskStatusDTO> {
    const { statusName } = updateTaskStatus;
    return this.statusService.update(id, statusName);
  }
}
