import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuoteDTO } from '../dto/quote.dto';
import { QuoteEntity } from '../entity/quote.entity';
import { QuoteService } from '../services/quote.service';

@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}
  @Get()
  getAllQuotes(): Promise<QuoteEntity[]> {
    return this.quoteService.findAll();
  }

  @Post()
  createQuotes(@Body() createQuoteDTO: QuoteDTO): Promise<QuoteEntity> {
    return this.quoteService.create(createQuoteDTO);
  }

  @Get(':id')
  getQuote(@Param('id') id: string): Promise<QuoteEntity> {
    return this.quoteService.findOne(id);
  }
}
