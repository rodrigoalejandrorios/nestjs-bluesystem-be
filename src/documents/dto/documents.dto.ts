import { IsNotEmpty, IsUUID } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';

export class DocumentsDTO extends AbstractDto {
  @IsNotEmpty()
  base64: string;

  @IsUUID()
  user: string;
}
