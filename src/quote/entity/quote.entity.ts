import { BaseEntity } from 'src/config/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'quotes' })
export class QuoteEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  number: number;
}
