import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';
import { CreateRo } from './ro/create.ro';
import { CustomersAuthCustomerDecorator } from '../auth/customers-auth/customers-auth.customer.decorator';
import { Customer } from '../customers/entities/customer.entity';
import { GetAllRo } from './ro/get-all-ro';
import { GetOneRo } from './ro/get-one.ro';

@ApiTags('order')
@Controller('api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('add')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: CreateRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT, AuthGuardsEnum.CUSTOMER_JWT)
  create(
    @Body() orderDto: OrderDto,
    @CustomersAuthCustomerDecorator() customer: Customer,
  ): Promise<CreateRo> {
    return this.ordersService.add(orderDto, customer._id);
  }

  @Get('get/all')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: GetAllRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT, AuthGuardsEnum.CUSTOMER_JWT)
  getAll(
    @CustomersAuthCustomerDecorator() customer: Customer,
  ): Promise<GetAllRo> {
    return this.ordersService.getAll(customer._id);
  }

  @Get('get/one/:orderId')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: GetOneRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT, AuthGuardsEnum.CUSTOMER_JWT)
  getOne(
    @CustomersAuthCustomerDecorator() customer: Customer,
    @Param('orderId') orderId: string,
  ): Promise<GetOneRo> {
    return this.ordersService.getOne(orderId, customer._id);
  }
}
