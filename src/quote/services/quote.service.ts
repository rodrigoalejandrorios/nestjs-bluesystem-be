import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/config/service/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { QuoteEntity } from '../entity/quote.entity';
import { QuoteRepository } from '../repositories/quote.repositoriy';

@Injectable()
export class QuoteService extends BaseService<QuoteEntity> {
  constructor(
    @InjectRepository(QuoteRepository)
    private readonly quoteRepository: QuoteRepository,
  ) {
    super(quoteRepository);
  }
}
