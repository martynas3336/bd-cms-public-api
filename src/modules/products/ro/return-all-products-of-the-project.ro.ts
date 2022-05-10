import { ApiProperty } from '@nestjs/swagger';

class Item {
  @ApiProperty()
  id: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  statusChangedAt: Date;
}

export class ReturnAllProductsOfTheProjectRo {
  @ApiProperty()
  itemsCount: number;

  @ApiProperty({ type: [Item] })
  items: Item[];
}
