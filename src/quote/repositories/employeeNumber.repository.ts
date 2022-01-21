import { EntityRepository, Repository } from 'typeorm';
import { NumberEmployeeEntity } from '../entity/employeenumber.entity';

@EntityRepository(NumberEmployeeEntity)
export class NumberEmployeeRepository extends Repository<NumberEmployeeEntity> {}
