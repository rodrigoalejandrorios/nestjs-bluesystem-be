import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { BaseEntity } from '../entity/base.entity';

@Injectable()
export class BaseService<T extends BaseEntity> {
  constructor(private readonly globalRespository: Repository<T>) {}

  async create(entity: any): Promise<T> {
    return this.globalRespository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.globalRespository.find();
  }

  async findOne(id: string, errMsg?: string): Promise<T> {
    const found = await this.globalRespository.findOne(id);

    if (!found || found === null || found === undefined) {
      throw new NotFoundException(errMsg);
    }

    return found;
  }

  delete(id: string) {
    return this.globalRespository.delete(id);
  }

  update(id: string, entity: any): Promise<any> {
    return this.globalRespository.update(id, entity);
  }
}
