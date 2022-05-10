import { Controller, Get, Param, Query, Headers } from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VariationsService } from './variations.service';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Project } from '../project/entities/project.entity';
import { ReturnAllProductsOfTheProjectRo } from './ro/return-all-products-of-the-project.ro';
import { ProductByKeysRo } from './ro/product-by-keys.ro';
import { GetOneRo } from './ro/get-one.ro';

@ApiTags('variations')
@Controller('api/v1/variations')
export class VariationsController {
  constructor(private readonly productsService: VariationsService) {}

  @Get()
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ status: 200, type: ReturnAllProductsOfTheProjectRo })
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async returnAllProductsOfTheProject(
    @ProjectAuthProjectDecorator() project: Project,
    @Headers() headers: { language?: string },
  ): Promise<ReturnAllProductsOfTheProjectRo> {
    return await this.productsService.getProducts(
      project._id,
      [],
      headers['language'],
    );
  }

  @Get('by/keywords')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ status: 200, type: ProductByKeysRo })
  @ApiQuery({
    type: [String],
    name: 'keywords',
  })
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async productsByKeys(
    @ProjectAuthProjectDecorator() project: Project,
    @Headers() headers: { language?: string },
    @Query('keywords') keywords: string[],
  ): Promise<ProductByKeysRo> {
    return await this.productsService.search(
      project._id,
      keywords,
      headers['language'],
    );
  }

  @Get('one/:id')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'language' })
  @ApiResponse({ status: 200, type: GetOneRo })
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async getOne(
    @ProjectAuthProjectDecorator() project: Project,
    @Param('id') variationId: string,
  ): Promise<GetOneRo> {
    return await this.productsService.getProduct(project._id, variationId);
  }
}
