import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/config/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusEntity } from '../entity/status.entity';
import { StatusRepository } from '../repositories/status.repository';

@Injectable()
export class StatusService extends BaseService<StatusEntity> {
  constructor(
    @InjectRepository(StatusRepository)
    private readonly statusRepository: StatusRepository,
  ) {
    super(statusRepository);
  }
}
