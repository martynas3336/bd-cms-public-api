import { ApiProperty } from '@nestjs/swagger';

export class GetOneRo {
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
