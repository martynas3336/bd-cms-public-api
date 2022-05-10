import { ApiProperty } from '@nestjs/swagger';

class CartProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  price: number;
}

export class GetCartRo {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: [CartProductDto] })
  @ApiProperty()
  products: CartProductDto[];

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  customer: string;
}
