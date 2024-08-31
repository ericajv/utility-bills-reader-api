import { Body, Controller, Get, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { MeasureConfirmationBodyDto } from 'src/dto/measure_confirmation_body.dto';
import { ConfirmationService } from 'src/services/confirmation.service';

@Controller('/confirm')
export class ConfirmationController {
  constructor(private readonly confirmationService: ConfirmationService) {}

  @Patch()
  confirmMeasure(@Body() body: MeasureConfirmationBodyDto) {
    this.confirmationService.confirmMeasure(body);
    return { success: true };
  }
}
