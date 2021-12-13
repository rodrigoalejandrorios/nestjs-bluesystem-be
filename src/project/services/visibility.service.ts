import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/config/service/base.service';
import { VisibilityEntity } from '../entity/visibility.entity';
import { VisibilityRepository } from '../repository/visibility.repository';

@Injectable()
export class VisibilityService extends BaseService<VisibilityEntity> {
  constructor(
    @InjectRepository(VisibilityRepository)
    private readonly visibilityRepository: VisibilityRepository,
  ) {
    super(visibilityRepository);
  }
}
