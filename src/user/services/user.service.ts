import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/config/service/base.service';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super(userRepository);
  }

  async findOneUser(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id, {
      relations: [
        'roleType',
        'tasks',
        'projects',
        'projects.visibility',
        'teams',
        'roleProjectType',
      ],
    });
  }
}
