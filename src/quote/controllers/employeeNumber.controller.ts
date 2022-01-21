import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NumberEmployeeEntity } from '../entity/employeenumber.entity';
import { NumberEmployeeService } from '../services/employeNumber.service';

@Controller('number-employee')
export class NumberEmployeeController {
  constructor(private readonly numberEmployeeService: NumberEmployeeService) {}
  @Get()
  getAllNumbers(): Promise<NumberEmployeeEntity[]> {
    return this.numberEmployeeService.findAll();
  }

  @Post()
  createNumber(@Body() createNumber): Promise<NumberEmployeeEntity> {
    let created = [];
    created.push(...createNumber);
    return this.numberEmployeeService.create(created);
  }

  @Get(':id')
  getNumber(@Param('id') id: string): Promise<NumberEmployeeEntity> {
    return this.numberEmployeeService.findOne(id);
  }
}
