import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class OrderDto {
  @ApiProperty()
  @IsMongoId()
  cartId: string;
}
