import { Controller, Get } from '@nestjs/common';
import { CustomerService } from 'src/services/customer.service';

@Controller('/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(): object {
    return this.customerService.getHello();
  }
}
