import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/config/service/base.service';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectRepository } from '../repository/project.repository';

@Injectable()
export class ProjectService extends BaseService<ProjectEntity> {
  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectRepository: ProjectRepository,
  ) {
    super(projectRepository);
  }

  findProjectWithDetails(id: string): Promise<ProjectEntity> {
    return this.projectRepository.findOne(id, {
      relations: ['visibility', 'tasks', 'users'],
    });
  }
}
