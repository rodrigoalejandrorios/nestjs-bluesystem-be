import { Injectable } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  constructor() {
    dotenv.config({
      path: `.env`,
    });
  }

  public getEnv(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.getEnv(key));
  }

  get typeORMConfig(): TypeOrmModuleOptions {
    return {
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
      keepConnectionAlive: true,
      type: 'mysql',
      synchronize: true,
      host: this.getEnv('MYSQL_HOST'),
      port: this.getNumber('MYSQL_PORT'),
      username: this.getEnv('MYSQL_USER'),
      password: this.getEnv('MYSQL_PASS'),
      database: this.getEnv('MYSQL_DB'),
      migrationsRun: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
