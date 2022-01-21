import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/config/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { QuoteRepository } from '../repositories/quote.repositoriy';
import { NumberEmployeeEntity } from '../entity/employeenumber.entity';
import { NumberEmployeeRepository } from '../repositories/employeeNumber.repository';

@Injectable()
export class NumberEmployeeService extends BaseService<NumberEmployeeEntity> {
  constructor(
    @InjectRepository(NumberEmployeeRepository)
    private readonly numberEmployeeRepository: NumberEmployeeRepository,
  ) {
    super(numberEmployeeRepository);
  }
}
