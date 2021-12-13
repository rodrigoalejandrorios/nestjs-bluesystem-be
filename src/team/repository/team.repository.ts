import { EntityRepository, Repository } from 'typeorm';
import { TeamEntity } from '../entity/team.entity';

@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {}
