import { ApiProperty } from '@nestjs/swagger';

class Item {
  @ApiProperty()
  variationId: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  variationName: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  priceTax: number;

  @ApiProperty()
  priceRegular: number;
}

export class GetOneRo {
  @ApiProperty({ type: Item })
  item: Item;
}
