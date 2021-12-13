import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamController } from './controllers/team.controller';
import { TeamRepository } from './repository/team.repository';
import { TeamService } from './services/team.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamRepository])],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
