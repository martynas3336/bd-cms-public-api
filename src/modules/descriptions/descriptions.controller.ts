import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
  Headers,
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DescriptionsService } from './descriptions.service';
import { Project } from '../project/entities/project.entity';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { FindOneByKeyAndVersionRo } from './ro/find-one-by-key-and-version.ro';
import { FindByKeysRo } from './ro/find-by-keys.ro';

@ApiTags('Descriptions')
@Controller('api/v1/descriptions')
export class DescriptionsController {
  constructor(private readonly descriptionsService: DescriptionsService) {}

  @Get('key/:key/version/:version')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ status: 200, type: FindOneByKeyAndVersionRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  findOneByKeyAndVersion(
    @Headers('language') language: string,
    @ProjectAuthProjectDecorator() project: Project,
    @Param('key') key: string,
    @Param('version') version: string,
  ): Promise<FindOneByKeyAndVersionRo> {
    return this.descriptionsService.findByKeyAndVersion(
      project,
      language,
      key,
      version,
    );
  }

  @Get('get-by-keys')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ status: 200, type: FindByKeysRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiQuery({
    required: true,
    type: [String],
    name: 'keys',
  })
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  findByKeys(
    @Headers('language') language: string,
    @ProjectAuthProjectDecorator() project: Project,
    @Query('keys') keys: string | string[],
  ): Promise<FindByKeysRo> {
    return this.descriptionsService.findByKeys(project, language, keys);
  }
}
