import { ApiProperty } from '@nestjs/swagger';

class Item {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  variationId: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  priceTax: number;

  @ApiProperty()
  priceRegular: number;

  @ApiProperty()
  keyWords: string[];

  @ApiProperty()
  ordering: number;
}

export class ProductByKeysRo {
  @ApiProperty()
  itemsCount: number;

  @ApiProperty({ type: [Item] })
  items: Item[];
}
