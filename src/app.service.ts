import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ServerOn(): string {
    return 'Aplicacion funcionando';
  }
}
