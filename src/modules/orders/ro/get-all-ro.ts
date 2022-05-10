import { ApiProperty } from '@nestjs/swagger';

class Item {
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

export class GetAllRo {
  @ApiProperty({ type: [Item] })
  items: Item[];
}
