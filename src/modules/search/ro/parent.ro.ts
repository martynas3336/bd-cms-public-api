import { ApiProperty } from '@nestjs/swagger';

export class ParentRo {
  @ApiProperty()
  items: string[];
}
