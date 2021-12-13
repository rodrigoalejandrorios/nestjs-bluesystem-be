import { BaseEntity } from 'src/config/entity/base.entity';
import { RoleType } from 'src/user/dto/role.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'role_projects' })
export class RoleProjectEntity extends BaseEntity {
  @Column({ nullable: false })
  type: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    nullable: false,
    default: RoleType.BASIC,
  })
  roleType: RoleType;

  @ManyToOne(() => UserEntity, (user) => user.roleProjectType)
  @JoinColumn({ name: 'user_id' })
  users: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.roleProjectType)
  @JoinColumn({ name: 'project_id' })
  projects: ProjectEntity;
}
