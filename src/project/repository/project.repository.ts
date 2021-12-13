import { EntityRepository, Repository } from 'typeorm';
import { ProjectEntity } from '../entity/project.entity';

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {}
