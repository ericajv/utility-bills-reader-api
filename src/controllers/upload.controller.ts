import { Body, Controller, Post } from '@nestjs/common';
import { MeasureUploadBodyDto } from 'src/dto/measure_upload_body.dto';
import { UploadService } from 'src/services/upload.service';

@Controller('/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  uploadeasure(@Body() body: MeasureUploadBodyDto) {
    return this.uploadService.uploadMeasure(body);
  }
}
