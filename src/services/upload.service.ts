import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MeasureUploadBodyDto } from 'src/dto/measure_upload_body.dto';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { join } from 'node:path';
import { GeminiService } from './gemini.service';

@Injectable()
export class UploadService {
  constructor(
    private prisma: PrismaService,
    private gemini: GeminiService
  ) {}

  async uploadMeasure(measureUploadData: MeasureUploadBodyDto) {
    // check if already exists measure on same month
    const measureDate = new Date(measureUploadData.maesure_datetime);
    const { firstMonthDay, lastMonthDay } = this.getFirstAndLastDayOfMonthAndYear(measureDate);

    const existingMeasureOnSameMonth = await this.prisma.measure.findFirst({
      where: { datetime: {
        lte: new Date(lastMonthDay),
        gte: new Date(firstMonthDay),
      }}
    });

    if (existingMeasureOnSameMonth) {
      throw new HttpException('Leitura do mês já realizada', HttpStatus.CONFLICT);
    }

    // save image to disk
    const imagePath = this.saveImageToDisk(measureUploadData.image)

    // get measure value from LLM
    const value = await this.gemini.readValueFromImage(
      imagePath,
      measureUploadData.customer_code,
      measureUploadData.maesure_datetime
    );

    await this.prisma.measure.create({
      data: {
        datetime: measureDate,
        customerCode: measureUploadData.customer_code,
        imageUrl: imagePath,
        type: measureUploadData.measure_type,
        value
      }
    })
  }

  private getFirstAndLastDayOfMonthAndYear(date: Date) {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return { 
      firstMonthDay: `${year}-${month}-01`,
      lastMonthDay: `${year}-${month}-31`
    };
  }

  private saveImageToDisk(imageContents: string) {
    const imageHash = crypto.createHash('sha256');
    let imageBuffer = Buffer.from(imageContents, 'base64');
    const imagePath = join(__dirname, '..', '..', 'public', `${imageHash}.png`);
    fs.writeFileSync(imagePath, imageBuffer);
    
    return imagePath;
  }
}
