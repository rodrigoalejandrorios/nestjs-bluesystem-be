import { EntityRepository, Repository } from 'typeorm';
import { RoleProjectEntity } from '../entity/role-project.entity';

@EntityRepository(RoleProjectEntity)
export class RoleProjectRepository extends Repository<RoleProjectEntity> {}
