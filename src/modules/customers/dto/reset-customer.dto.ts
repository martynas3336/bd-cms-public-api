import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetCustomerDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  passwordAgain: string;
}
