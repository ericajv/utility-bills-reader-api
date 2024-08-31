import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MeasureConfirmationBodyDto } from 'src/dto/measure_confirmation_body.dto';

@Injectable()
export class ConfirmationService {
  constructor(private prisma: PrismaService) {}

  async confirmMeasure(measureConfirmationData: MeasureConfirmationBodyDto) {
    const uuid = measureConfirmationData.measure_id;
    const existingMeasure = await this.prisma.measure.findUnique({
      where: { uuid }
    });

    if (!existingMeasure) {
      throw new HttpException('Leitura não encontrada', HttpStatus.NOT_FOUND);
    }

    if (existingMeasure.hasConfirmed) {
      throw new HttpException('Leitura do mês já realizada', HttpStatus.CONFLICT);
    }

    await this.prisma.measure.update({
      where: { uuid },
      data: { hasConfirmed: true, value: measureConfirmationData.confirmed_value }
    });
  }
}
