import { Controller, Get, Param, Res } from '@nestjs/common';
import { DocumentsEntity } from '../entity/documents.entity';
import { DocumentsService } from '../services/documents.service';

import { UtilsDocumens } from '../utils/utilsDocuments';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly docService: DocumentsService,
    private readonly utilsService: UtilsDocumens,
  ) {}
  @Get('generate/:id')
  async getPDF(@Param('id') id: string, @Res() res): Promise<Buffer> {
    const buffer = await this.docService.generatePDFByUser(id);

    res.set({
      'Content-Type': 'application/pdf;base64',
      'Content-Disposition': `attachment; filename=DOC${Date.now()}.pdf`,
      //'Content-Length': buffer.length,
    });
    res.send(buffer);
    return buffer;
  }

  @Get(':id')
  async getPDFByDB(@Param('id') id: string, @Res() res): Promise<Buffer> {
    const { base64 } = await this.docService.getBlobById(id);

    let comprime: Buffer | string;

    if (Buffer.isBuffer(base64)) {
      const data = new Uint8Array(base64);
      const decode = this.utilsService.bufferToBase64(data);
      comprime = Buffer.from(decode, 'base64');
    } else {
      comprime = Buffer.from(base64, 'base64');
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=DOC${Date.now()}.pdf`,
      //'Content-Length': buffer.length,
    });
    res.send(comprime);
    return comprime;
  }

  @Get('user/:id')
  async getPDFByUser(@Param('id') id): Promise<DocumentsEntity[]> {
    return this.docService.getPDFsByUser(id);
  }
}
