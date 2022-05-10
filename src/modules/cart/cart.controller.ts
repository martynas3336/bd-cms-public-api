import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiHeader, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { UpsertCartDto } from './dto/upsert-cart.dto';
import { Project } from '../project/entities/project.entity';
import { UpsertCartRo } from './ro/upsert-cart.ro';
import { GetCartRo } from './ro/get-cart.ro';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { CustomersAuthCustomerDecorator } from '../auth/customers-auth/customers-auth.customer.decorator';
import { Customer } from '../customers/entities/customer.entity';

@ApiTags('cart')
@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('upsert')
  @ApiHeader({ name: 'project-id' })
  @ApiResponse({ status: 200, type: UpsertCartRo })
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT, AuthGuardsEnum.CUSTOMER_JWT)
  upsert(
    @Body() body: UpsertCartDto,
    @ProjectAuthProjectDecorator() project: Project,
    @CustomersAuthCustomerDecorator() customer: Customer,
  ): Promise<UpsertCartRo> {
    return this.cartService.upsert(body, project, customer._id);
  }

  @Get('by/id/:cartId')
  @ApiHeader({ name: 'project-id' })
  @ApiResponse({ status: 200, type: GetCartRo })
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT, AuthGuardsEnum.CUSTOMER_JWT)
  async getByCartId(
    @Param('cartId') cartId: string,
    @CustomersAuthCustomerDecorator() customer: Customer,
  ): Promise<GetCartRo> {
    return this.cartService.getByCartId(cartId, customer._id);
  }
}
