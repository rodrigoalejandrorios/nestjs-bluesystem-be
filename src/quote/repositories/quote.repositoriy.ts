import { EntityRepository, Repository } from 'typeorm';
import { QuoteEntity } from '../entity/quote.entity';

@EntityRepository(QuoteEntity)
export class QuoteRepository extends Repository<QuoteEntity> {}
