import { ApiProperty } from '@nestjs/swagger';

class Item {
  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  items: string[];
}

export class FindAllEnRo {
  @ApiProperty({ type: [Item] })
  items: Item[];
}
