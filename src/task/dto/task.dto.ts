import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';
import { TaskStatus } from './status.dto';

export class TaskDTO extends AbstractDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @ApiProperty()
  status?: TaskStatus;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dateStart?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  dateEnd?: Date;
}

export class TaskUpdateDTO extends PartialType(TaskDTO) {}
