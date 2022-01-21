import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repository/user.repository';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentsRepository } from './repository/document.repository';
import { DocumentsService } from './services/documents.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentsRepository, UserRepository])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
