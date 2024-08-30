import { IsEnum, IsOptional } from 'class-validator';

import { MeasureType } from "@prisma/client";

export class CustomerMeasuresQueryDto {  
  @IsOptional()
  @IsEnum(MeasureType)
  "measure_type": MeasureType;
}