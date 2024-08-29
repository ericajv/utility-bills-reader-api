import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getHello(): object {
    return { hello: 'Hello World!' };
  }
}
