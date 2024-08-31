import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { CustomerMeasuresQueryDto } from 'src/dto/customer_measures_query.dto';
import { PrismaService } from 'src/services/prisma.service';

@Controller('/:customer_code')
export class CustomerController {
  constructor(private prisma: PrismaService) {}

  @Get('/list')
  async listMeasures(
    @Param('customer_code') customerCode: string,
    @Query() query: CustomerMeasuresQueryDto
  ) {
    const measures = await this.prisma.measure.findMany({ 
      where: query.measure_type ? { customerCode, ...query } : { customerCode },
      select: {
        uuid: true,
        datetime: true,
        type: true,
        hasConfirmed: true,
        imageUrl: true
      }
    });

    if (measures.length === 0) {
      throw new HttpException('Nenhuma leitura não encontrada', HttpStatus.NOT_FOUND)
    }

    return { customer_code: customerCode, measures }
  }
}
