import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';
import { TaskStatus } from './status.dto';

export class TaskDTO extends AbstractDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  status?: TaskStatus;

  @IsDate()
  @IsOptional()
  dateStart?: Date;

  @IsDate()
  @IsOptional()
  dateEnd?: Date;
}
