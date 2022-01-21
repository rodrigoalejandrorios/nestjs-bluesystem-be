import { BaseEntity } from 'src/config/entity/base.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'documents' })
export class DocumentsEntity extends BaseEntity {
  @Column('longtext')
  base64;

  @ManyToOne(() => UserEntity, (user) => user.documents)
  user: UserEntity;
}
