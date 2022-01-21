import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentsRepository } from '../repository/document.repository';
import * as hbs from 'handlebars';
import * as cheerio from 'cheerio';
import * as path from 'path';
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import { BaseService } from 'src/config/service/base.service';
import { DocumentsEntity } from '../entity/documents.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { DocumentsDTO } from '../dto/documents.dto';

@Injectable()
export class DocumentsService extends BaseService<DocumentsEntity> {
  constructor(
    @InjectRepository(DocumentsRepository)
    private readonly documentsRepository: DocumentsRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(documentsRepository);
  }

  async compile(templateName: string, data): Promise<string> {
    const filePath = path.join(
      process.cwd(),
      'src/media/templates',
      `${templateName}.hbs`,
    );

    // const baseCss = path.join(
    //   process.cwd(),
    //   'src/media/templates/css',
    //   'base.css',
    // );

    //console.log(baseCss);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link href="css/base.css" rel="stylesheet">
      </head>
      <body>
        ${await fs.readFileSync(filePath, 'utf-8')}
      </body>
    </html>    
`;

    let htmlResult = hbs.compile(html);

    try {
      let hbResult = await htmlResult(data);
      return hbResult;
    } catch (err) {
      console.log(err);
    }
  }

  async generatePDFByUser(id: string): Promise<Buffer> {
    try {
      const data = await this.userRepository.findOne(id);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const content = await this.compile('salary', data);
      await page.setContent(content);
      const pdf = await page.pdf({
        format: 'a4',
        printBackground: true,
      });
      const json = await this.generateBase64(pdf, id);
      await this.documentsRepository.save(json);
      return pdf;
      //return pdf.toString('base64');
    } catch (e) {
      console.error(e);
    }
  }

  async generateBase64(blob, id): Promise<DocumentsDTO | any> {
    try {
      const b64 = await blob.toString('base64');
      const json = await {
        base64: b64,
        user: id,
      };
      return json;
    } catch (e) {
      console.error(e);
    }
  }

  async getBlobById(id: string): Promise<DocumentsEntity> {
    return this.documentsRepository.findOne(id);
  }

  async getPDFsByUser(userId: string): Promise<DocumentsEntity[]> {
    const doc = await this.documentsRepository.find({
      where: { user: userId },
    });
    return doc;
  }
}
