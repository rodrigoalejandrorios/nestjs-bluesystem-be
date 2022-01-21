import { Injectable } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  constructor() {
    const nodeEnv = this.nodeEnv ? `.${this.nodeEnv}.` : '.';
    dotenv.config({
      path: `${nodeEnv}env`,
    });
  }

  public getEnv(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    //console.log(__dirname);

    return Number(this.getEnv(key));
  }

  get nodeEnv(): string {
    return this.getEnv('NODE_ENV') || '';
  }

  get typeORMConfig(): TypeOrmModuleOptions {
    return {
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
      //cli: { migrationsDir: './migrations' },
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
