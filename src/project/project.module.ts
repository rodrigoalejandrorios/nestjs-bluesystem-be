import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './controllers/project.controller';
import { ProjectService } from './services/project.service';
import { ProjectRepository } from './repository/project.repository';
import { VisibilityRepository } from './repository/visibility.repository';
import { VisibilityController } from './controllers/visibility.controller';
import { VisibilityService } from './services/visibility.service';
import { RoleProjectRepository } from './repository/role-project.repository';
import { RoleProjectController } from './controllers/role-project.controller';
import { RoleProjectService } from './services/role-project.service';
import { RoleTeamRepository } from 'src/team/repository/role.team.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { TeamRepository } from '../team/repository/team.repository';
import { RoleRepository } from '../user/repository/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository,
      VisibilityRepository,
      RoleProjectRepository,
      RoleTeamRepository,
      UserRepository,
      TeamRepository,
      RoleRepository,
      RoleProjectRepository,
    ]),
  ],
  controllers: [ProjectController, VisibilityController, RoleProjectController],
  providers: [ProjectService, VisibilityService, RoleProjectService],
  exports: [ProjectService, VisibilityService, RoleProjectService],
})
export class ProjectModule {}
