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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository,
      VisibilityRepository,
      RoleProjectRepository,
    ]),
  ],
  controllers: [ProjectController, VisibilityController, RoleProjectController],
  providers: [ProjectService, VisibilityService, RoleProjectService],
  exports: [ProjectService, VisibilityService, RoleProjectService],
})
export class ProjectModule {}
