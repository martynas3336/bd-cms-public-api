import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class RegisterAnonymousPersonalCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 512)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 512)
  surname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 512)
  phone: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  country: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  city: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  @Length(2, 512)
  localAdministration: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  street: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  house: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  flat: string;

  @ApiProperty({ required: false, default: '' })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  postCode: string;
}
