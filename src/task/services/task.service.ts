import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseService } from 'src/config/service/base.service';
import { TaskEntity } from '../entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../repositories/task.repository';
import { TaskDTO } from '../dto/task.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { RoleProjectRepository } from 'src/project/repository/role-project.repository';
import { StatusRepository } from '../repositories/status.repository';
import { TaskStatus } from '../dto/status.dto';

@Injectable()
export class TaskService extends BaseService<TaskEntity> {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
    private readonly statusRepository: StatusRepository,
    private readonly roleProjectRepository: RoleProjectRepository,
  ) {
    super(taskRepository);
  }

  findOneWithDetail(id: string): Promise<TaskEntity> {
    return this.taskRepository.findOne(id, {
      relations: ['creatorUser', 'responsableUser', 'status', 'project'],
    });
  }

  async createTaskByUserIntoTeam(
    userId: UserEntity,
    projectId: ProjectEntity,
    bodyTask: TaskDTO,
  ): Promise<TaskEntity> {
    //TODO:
    //No obligatorio, pero si a implementar: La tarea tendria que tener un identificador por proyecto. Ejemplo: Si el proyecto se llama "Proyecto Blue Implements" la tarea deberia tener un identificador BI-01
    try {
      const status = await this.statusRepository.findOne({
        where: { statusType: TaskStatus.OPEN },
      });
      const ifProjectExist = await this.roleProjectRepository
        .createQueryBuilder('projectExist')
        .leftJoinAndSelect('projectExist.project', 'project')
        .leftJoinAndSelect('projectExist.user', 'user')
        .where('projectExist.user = :userId', { userId })
        .andWhere('projectExist.project = :projectId', { projectId })
        .getOne();
      if (ifProjectExist) {
        bodyTask.creatorUser = userId;
        if (!bodyTask.status) {
          bodyTask.status = status;
        }
        bodyTask.project = projectId;
        return this.taskRepository.save(bodyTask);
      } else {
        throw new UnauthorizedException('El usuario o proyecto no existe');
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  addUserResponsable() {}
}
