import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/config/service/base.service';
import { RoleProjectEntity } from '../entity/role-project.entity';
import { RoleProjectRepository } from '../repository/role-project.repository';

@Injectable()
export class RoleProjectService extends BaseService<RoleProjectEntity> {
  constructor(
    @InjectRepository(RoleProjectRepository)
    private readonly roleProjectRepository: RoleProjectRepository,
  ) {
    super(roleProjectRepository);
  }
}
