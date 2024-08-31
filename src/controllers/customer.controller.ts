import { Controller, Get, Param, Query } from '@nestjs/common';
import { CustomerMeasuresQueryDto } from 'src/dto/customer_measures_query.dto';
import { CustomerService } from 'src/services/customer.service';

@Controller('/:customer_code')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/list')
  async listMeasures(
    @Param('customer_code') customerCode: string,
    @Query() query: CustomerMeasuresQueryDto
  ) {
    return this.customerService.getCustomerMeasures(customerCode, query.measure_type);
  }
}
