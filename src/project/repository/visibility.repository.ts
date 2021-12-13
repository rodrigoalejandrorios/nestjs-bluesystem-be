import { EntityRepository, Repository } from 'typeorm';
import { VisibilityEntity } from '../entity/visibility.entity';

@EntityRepository(VisibilityEntity)
export class VisibilityRepository extends Repository<VisibilityEntity> {}
