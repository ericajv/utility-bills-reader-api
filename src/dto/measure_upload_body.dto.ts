import { MeasureType } from '@prisma/client';
import { IsBase64, IsEnum, IsISO8601, IsNotEmpty, IsUUID } from 'class-validator';

export class MeasureUploadBodyDto {  
  @IsNotEmpty()
  @IsBase64()
  "image": string;

  @IsNotEmpty()
  @IsUUID()
  "customer_code": string;

  @IsNotEmpty()
  @IsISO8601({ strict: true })
  "maesure_datetime": string;

  @IsNotEmpty()
  @IsEnum(MeasureType)
  "measure_type": MeasureType;
}