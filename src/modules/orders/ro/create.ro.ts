import { ApiProperty } from '@nestjs/swagger';

export class CreateRo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  cartId: string;

  @ApiProperty()
  deliverId: string;

  @ApiProperty()
  paymentId: string;
}
