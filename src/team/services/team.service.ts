import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/config/service/base.service';
import { TeamEntity } from '../entity/team.entity';
import { TeamRepository } from '../repository/team.repository';

export class TeamService extends BaseService<TeamEntity> {
  constructor(
    @InjectRepository(TeamRepository)
    private readonly teamRepository: TeamRepository,
  ) {
    super(teamRepository);
  }

  findProjectWithDetails(id: string): Promise<TeamEntity> {
    return this.teamRepository.findOne(id, {
      relations: ['users', 'projects', 'team'],
    });
  }
}
