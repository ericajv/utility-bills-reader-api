import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MeasureType } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getCustomerMeasures(customerCode: string, measureType: MeasureType|null) {
    const measures = await this.prisma.measure.findMany({ 
      where: measureType ? { customerCode, type: measureType } : { customerCode },
      select: {
        uuid: true,
        datetime: true,
        type: true,
        hasConfirmed: true,
        imageUrl: true
      }
    });

    if (measures.length === 0) {
      throw new HttpException('Nenhuma leitura encontrada', HttpStatus.NOT_FOUND)
    }

    return { customer_code: customerCode, measures }
  }
}
