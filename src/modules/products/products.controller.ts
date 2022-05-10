import { Controller, Get, Param, Headers } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Project } from '../project/entities/project.entity';
import { ReturnAllProductsOfTheProjectRo } from './ro/return-all-products-of-the-project.ro';
import { GetOneRo } from './ro/get-one.ro';

@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('get/all')
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
    @Param('id') productId: string,
  ): Promise<GetOneRo> {
    return await this.productsService.getProduct(project._id, productId);
  }
}
