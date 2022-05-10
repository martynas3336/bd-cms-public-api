import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;
}

class Variation {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  lastUpdateAt: Date;

  @ApiProperty()
  lastUpdateBy: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  priceTax: number;

  @ApiProperty()
  priceRegular: number;

  @ApiProperty()
  isStock: boolean;

  @ApiProperty()
  noTax: boolean;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  companyProductId: string;

  @ApiProperty()
  barcode: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  imagesIds: string[];

  @ApiProperty({ type: [Image] })
  imagesPool: Image[];

  @ApiProperty()
  keyWords: string[];

  @ApiProperty()
  ordering: number;
}

class Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: Variation })
  variation: Variation;
}

export class ReturnAllProductsOfTheProjectRo {
  @ApiProperty()
  itemsCount: number;

  @ApiProperty({ type: [Item] })
  items: Item[];
}
