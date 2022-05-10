import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsArray,
  IsString,
  IsMongoId,
  IsNumber,
} from 'class-validator';

class CartProductDto {
  @ApiProperty()
  @IsMongoId()
  id: string;

  @ApiProperty({ required: true })
  @IsNumber()
  amount: number;

  @ApiProperty({ required: true })
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  image: string;
}

export class UpsertCartDto {
  @ApiProperty({ type: [CartProductDto], required: true })
  @IsArray()
  products: CartProductDto[];

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  cartId: string;
}
