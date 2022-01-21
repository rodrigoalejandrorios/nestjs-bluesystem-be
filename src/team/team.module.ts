import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from 'src/user/repository/role.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { TeamController } from './controllers/team.controller';
import { RoleTeamRepository } from './repository/role.team.repository';
import { TeamRepository } from './repository/team.repository';
import { TeamService } from './services/team.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamRepository,
      RoleTeamRepository,
      RoleRepository,
      UserRepository,
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
