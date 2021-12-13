import { IsNotEmpty, IsOptional } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';

export class TeamDTO extends AbstractDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;
}
