import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/config/service/base.service';
import { RoleDTO } from '../dto/role.dto';
import { RoleEntity } from '../entity/role.entity';
import { RoleRepository } from '../repository/role.repository';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) {
    super(roleRepository);
  }
}
