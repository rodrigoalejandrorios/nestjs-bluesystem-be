import { EntityRepository, Repository } from 'typeorm';
import { StatusEntity } from '../entity/status.entity';
import { TaskEntity } from '../entity/task.entity';

@EntityRepository(StatusEntity)
export class StatusRepository extends Repository<StatusEntity> {}
