import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VisibilityDTO } from '../dto/visibility.dto';
import { VisibilityEntity } from '../entity/visibility.entity';
import { VisibilityService } from '../services/visibility.service';

@Controller('visibility-project')
export class VisibilityController {
  constructor(private readonly visibilityService: VisibilityService) {}
  @Get()
  getAllProjects(): Promise<VisibilityEntity[]> {
    return this.visibilityService.findAll();
  }

  @Get(':id')
  getProject(@Param('id') id: string): Promise<VisibilityEntity> {
    return this.visibilityService.findOne(
      id,
      `El proyecto con el ID: ${id} no existe`,
    );
  }

  @Post()
  createProject(
    @Body() visibilityDTO: VisibilityDTO,
  ): Promise<VisibilityEntity> {
    return this.visibilityService.create(visibilityDTO);
  }
}
