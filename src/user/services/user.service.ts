import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/config/service/base.service';
import { CreateUserDTO } from '../dto/user.dto';
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
    const findUser = await this.userRepository.findOne(id, {
      relations: [
        'roleType',
        'tasksCreate',
        'tasksResponsable',
        'projects',
        'projects.role',
        'projects.project',
        'teams',
        'teams.role',
        'teams.team',
        'documents',
      ],
    });

    if (!findUser) {
      throw new NotFoundException(`No se encontro el usuario con el id: ${id}`);
    }

    return findUser;
  }

  async createUserSecure(data: CreateUserDTO): Promise<UserEntity> {
    const newUser = await this.userRepository.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return this.userRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const userByUsername = await this.userRepository.findOne({
      where: { username: username },
    });
    return userByUsername;
  }
  async findByEmail(email: string): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: email },
    });
    return userByEmail;
  }
}
