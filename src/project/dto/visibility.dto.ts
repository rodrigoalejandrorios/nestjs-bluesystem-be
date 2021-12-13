import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';
import { ProjectDTO } from './project.dto';

export enum ProjectVisibility {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export class VisibilityDTO extends AbstractDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProjectVisibility)
  mode: ProjectVisibility;

  @IsOptional()
  projects?: ProjectDTO[];
}
