import { ApiProperty } from '@nestjs/swagger';

export class ChildRo {
  @ApiProperty()
  items: string[];
}
