import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetInitCustomerDto {
  @ApiProperty()
  @IsString()
  email: string;
}
