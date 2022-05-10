import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DomainService } from './domain.service';
import { GetInfoAboutDomainRo } from './ro/get-info-about-domain.ro';

@ApiTags('domain')
@Controller('api/v1/domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @ApiResponse({ status: 200, type: GetInfoAboutDomainRo })
  @Get(':domain')
  getInfoAboutDomain(
    @Param('domain') domain: string,
  ): Promise<GetInfoAboutDomainRo> {
    return this.domainService.getProjectInfoByDomain(domain);
  }
}
