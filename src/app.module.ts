import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { ConfirmationController } from './controllers/confirmation.controller';
import { ConfirmationService } from './services/confirmation.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [],
  controllers: [UploadController, ConfirmationController, CustomerController],
  providers: [UploadService, ConfirmationService, CustomerService],
})

export class AppModule {}
