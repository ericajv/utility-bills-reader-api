import { Controller, Get } from '@nestjs/common';
import { ConfirmationService } from 'src/services/confirmation.service';

@Controller('/confirm')
export class ConfirmationController {
  constructor(private readonly confirmationService: ConfirmationService) {}

  @Get()
  getHello(): object {
    return this.confirmationService.getHello();
  }
}
