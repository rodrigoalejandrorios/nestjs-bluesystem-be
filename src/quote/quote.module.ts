import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NumberEmployeeRepository } from './repositories/employeeNumber.repository';
import { QuoteRepository } from './repositories/quote.repositoriy';
import { QuoteController } from './controllers/quote.controller';
import { NumberEmployeeController } from './controllers/employeeNumber.controller';
import { QuoteService } from './services/quote.service';
import { NumberEmployeeService } from './services/employeNumber.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuoteRepository, NumberEmployeeRepository]),
  ],
  controllers: [QuoteController, NumberEmployeeController],
  providers: [QuoteService, NumberEmployeeService],
  exports: [QuoteService, NumberEmployeeService],
})
export class QuoteModule {}
