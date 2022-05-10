import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateCustomerCompanyDetails {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  companyName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  companyLegalCode: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(6, 512)
  companyTaxCode: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  country: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  city: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(2, 512)
  localAdministration: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  street: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  house: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  flat: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  postCode: string;
}

export class UpdateCustomerDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(2, 512)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(2, 512)
  surname: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(6, 512)
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(6, 512)
  phone: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  country: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  city: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(2, 512)
  localAdministration: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  street: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  house: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 512)
  flat: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(3, 512)
  postCode: string;

  @ApiProperty({ required: false })
  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateCustomerCompanyDetails)
  companyDetails: UpdateCustomerCompanyDetails;
}
