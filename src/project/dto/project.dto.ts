import { IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';
import { TeamDTO } from 'src/team/dto/team.dto';
import { RoleProjectEntity } from '../entity/role-project.entity';
import { VisibilityDTO } from './visibility.dto';
import { VisibilityEntity } from '../entity/visibility.entity';
import { TaskEntity } from 'src/task/entity/task.entity';

export class ProjectDTO extends AbstractDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  visibility?: VisibilityEntity;

  @IsOptional()
  roleProjectType?: RoleProjectEntity[];

  @IsOptional()
  tasks?: TaskEntity[];

  @IsOptional()
  team?: TeamDTO;
}
