import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.typeORMConfig,
      inject: [ConfigService],
    }),
    TaskModule,
    UserModule,
    ProjectModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
