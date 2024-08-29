import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  getHello(): object {
    return { hello: 'Hello World!' };
  }
}
