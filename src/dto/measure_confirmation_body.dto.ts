import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class MeasureConfirmationBodyDto {  
  @IsNotEmpty()
  @IsUUID()
  "measure_id": string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  "confirmed_value": number;
}