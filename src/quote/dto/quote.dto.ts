import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { AbstractDto } from 'src/config/dto/base-dto';

export class QuoteDTO extends AbstractDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;
}
