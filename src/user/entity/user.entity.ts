import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/config/entity/base.entity';
import { DocumentsEntity } from 'src/documents/entity/documents.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { RoleProjectEntity } from 'src/project/entity/role-project.entity';
import { TaskEntity } from 'src/task/entity/task.entity';
import { RoleTeamEntity } from 'src/team/entity/role-team.entity';
import { TeamEntity } from 'src/team/entity/team.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RoleType } from '../dto/role.dto';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: false })
  jobPosition: string;

  @ManyToOne(() => RoleEntity, (roleType) => roleType.users, {
    nullable: false,
  })
  @JoinColumn({ name: 'role_id' })
  roleType: RoleEntity;

  @OneToMany(() => RoleProjectEntity, (roleType) => roleType.user)
  projects: RoleProjectEntity[];

  @OneToMany(() => RoleTeamEntity, (roleType) => roleType.user)
  teams: RoleTeamEntity[];

  @OneToMany(() => TaskEntity, (tasks) => tasks.user)
  tasks: TaskEntity[];

  @OneToMany(() => DocumentsEntity, (documents) => documents.user)
  documents: DocumentsEntity[];
}
