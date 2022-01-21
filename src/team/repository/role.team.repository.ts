import { EntityRepository, Repository } from 'typeorm';
import { RoleTeamEntity } from '../entity/role-team.entity';

@EntityRepository(RoleTeamEntity)
export class RoleTeamRepository extends Repository<RoleTeamEntity> {}
