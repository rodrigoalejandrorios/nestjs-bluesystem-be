import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { TaskStatus } from './status.dto';
import { StatusEntity } from '../entity/status.entity';
import { ProjectEntity } from '../../project/entity/project.entity';

export class TaskDTO extends AbstractDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @ApiProperty()
  tags?: string[];

  @IsOptional()
  @ApiProperty()
  status?: StatusEntity;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dateStart?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dateEnd?: Date;

  @IsOptional()
  @ApiProperty()
  creatorUser?: UserEntity;

  @IsOptional()
  @ApiProperty()
  responsableUser?: UserEntity;

  @IsOptional()
  @ApiProperty()
  project?: ProjectEntity;
}

export class TaskUpdateDTO extends PartialType(TaskDTO) {}
