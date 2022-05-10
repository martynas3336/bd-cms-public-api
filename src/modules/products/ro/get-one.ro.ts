import { ApiProperty } from '@nestjs/swagger';

export class GetOneRo {
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
