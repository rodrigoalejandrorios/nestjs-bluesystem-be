import { EntityRepository, Repository } from 'typeorm';
import { DocumentsEntity } from '../entity/documents.entity';

@EntityRepository(DocumentsEntity)
export class DocumentsRepository extends Repository<DocumentsEntity> {}
