import { ApiProperty } from '@nestjs/swagger';

class DescriptionRo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  version: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  modifiedBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  modifiedAt: Date;
}

export class FindByKeysRo {
  @ApiProperty({ type: [DescriptionRo] })
  items: DescriptionRo[];
}
