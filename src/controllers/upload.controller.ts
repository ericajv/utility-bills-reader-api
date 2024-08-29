import { Controller, Get } from '@nestjs/common';
import { UploadService } from 'src/services/upload.service';

@Controller('/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  getHello(): object {
    return this.uploadService.getHello();
  }
}
