import { ApiProperty } from '@nestjs/swagger';

export class GetInfoAboutDomainRo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  domain: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  createdAt: Date;
}
