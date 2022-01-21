import { BaseEntity } from 'src/config/entity/base.entity';
import { RoleProjectEntity } from 'src/project/entity/role-project.entity';
import { RoleTeamEntity } from 'src/team/entity/role-team.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RoleType } from '../dto/role.dto';
import { UserEntity } from './user.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
  @Column({ nullable: false })
  type: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    nullable: false,
    default: RoleType.BASIC,
  })
  roleType: RoleType;

  @OneToMany(() => UserEntity, (user) => user.roleType)
  users: UserEntity[];

  @OneToMany(() => RoleProjectEntity, (role) => role.role)
  roleProjectType: RoleProjectEntity[];

  @OneToMany(() => RoleTeamEntity, (role) => role.role)
  roleTeamType: RoleTeamEntity[];
}
