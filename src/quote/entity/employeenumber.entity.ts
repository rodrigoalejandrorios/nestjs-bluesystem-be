import { BaseEntity } from 'src/config/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'number_employee' })
export class NumberEmployeeEntity extends BaseEntity {
  @Column({ nullable: false })
  codeNumberEmployee: number;

  @Column({ nullable: false })
  nameNumber: string;
}
