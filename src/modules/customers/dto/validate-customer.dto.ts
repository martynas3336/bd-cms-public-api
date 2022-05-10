import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateCustomerDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  code: string;
}
