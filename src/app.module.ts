import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';
import { ConfirmationController } from './controllers/confirmation.controller';
import { ConfirmationService } from './services/confirmation.service';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { PrismaService } from './services/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [UploadController, ConfirmationController, CustomerController],
  providers: [UploadService, ConfirmationService, CustomerService, PrismaService],
})

export class AppModule {}
