import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfirmationService {
  getHello(): object {
    return { hello: 'Hello World!' };
  }
}
