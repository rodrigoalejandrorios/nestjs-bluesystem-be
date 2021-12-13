import { BaseEntity } from 'src/config/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProjectVisibility } from '../dto/visibility.dto';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'visibilities' })
export class VisibilityEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: ProjectVisibility,
    default: ProjectVisibility.PUBLIC,
    nullable: false,
  })
  mode: ProjectVisibility;

  @OneToMany(() => ProjectEntity, (projects) => projects.visibility)
  projects: ProjectEntity[];
}
