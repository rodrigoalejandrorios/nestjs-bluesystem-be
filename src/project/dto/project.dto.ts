import { IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';
import { VisibilityDTO } from './visibility.dto';

export class ProjectDTO extends AbstractDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  description?: string;
}
