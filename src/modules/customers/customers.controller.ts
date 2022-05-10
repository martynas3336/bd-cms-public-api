import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Put,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';

import { RegisterLegalCustomerDto } from './dto/register-legal-customer.dto';
import { RegisterPersonalCustomerDto } from './dto/register-personal-customer.dto';
import { RegisterAnonymousLegalCustomerDto } from './dto/register-anonymous-legal-customer.dto';
import { RegisterAnonymousPersonalCustomerDto } from './dto/register-anonymous-personal-customer.dto';

import { ValidateRo } from './ro/validate.ro';
import { RegisterLegalRo } from './ro/register-legal.ro';

import { ResetCustomerDto } from './dto/reset-customer.dto';
import { ResetInitCustomerDto } from './dto/reset-init-customer.dto';
import { ValidateCustomerDto } from './dto/validate-customer.dto';

import { Project } from '../project/entities/project.entity';
import { RegisterPersonalRo } from './ro/register-personal.ro';
import { RegisterAnonymousLegalRo } from './ro/register-anonymous-legal.ro';
import { RegisterAnonymousPersonalRo } from './ro/register-anonymous-personal.ro';
import { LoginRo } from './ro/login.ro';
import { PasswordResetInitRo } from './ro/password-reset-init.ro';
import { PasswordResetRo } from './ro/password-reset.ro';
import { CustomersAuthService } from '../auth/customers-auth/customers-auth.service';
import { CustomersAuthCustomerDecorator } from '../auth/customers-auth/customers-auth.customer.decorator';
import { Customer } from './entities/customer.entity';
import { GetCustomerRo } from './ro/get-customer.ro';
import { UpdateCustomerRo } from './ro/update-customer.ro';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ProjectAuthProjectDecorator } from '../auth/project-auth/project-auth.project.decorator';
import { Auth } from '../auth/auth.decorator';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';

@ApiTags('customers')
@Controller('api/v1/customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly customersAuthService: CustomersAuthService,
  ) {}

  @Post('validate')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: ValidateRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async validate(@Body() body: ValidateCustomerDto): Promise<ValidateRo> {
    return this.customersService.validate(body);
  }

  @Post('register/legal')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: RegisterLegalRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async registerLegal(
    @Body() body: RegisterLegalCustomerDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<RegisterLegalRo> {
    await this.customersService.createLegalCustomer(body, project);
    return {};
  }

  @Post('register/personal')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: RegisterPersonalRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async registerPersonal(
    @Body() body: RegisterPersonalCustomerDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<RegisterPersonalRo> {
    await this.customersService.createPersonalCustomer(body, project);
    return {};
  }

  @Post('register/anonymous-legal')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: RegisterAnonymousLegalRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async registerAnonymousLegal(
    @Body() body: RegisterAnonymousLegalCustomerDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<RegisterAnonymousLegalRo> {
    return this.customersService.createAnonymousLegalCustomer(body, project);
  }

  @Post('register/anonymous-personal')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: RegisterAnonymousPersonalRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async registerAnonymousPersonal(
    @Body() body: RegisterAnonymousPersonalCustomerDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<RegisterAnonymousPersonalRo> {
    return this.customersService.createAnonymousPersonalCustomer(body, project);
  }

  @Post('login')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: LoginRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_LOCAL, AuthGuardsEnum.CUSTOMER_PROJECT)
  async login(
    @CustomersAuthCustomerDecorator() customer: Customer,
  ): Promise<LoginRo> {
    return this.customersAuthService.login(customer);
  }

  @Post('password/reset/init')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: PasswordResetInitRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async init(
    @Body() body: ResetInitCustomerDto,
    @ProjectAuthProjectDecorator() project: Project,
  ): Promise<PasswordResetInitRo> {
    await this.customersService.resetInit(body, project);
    return {};
  }

  @Post('password/reset')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiResponse({ status: 200, type: PasswordResetRo })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT)
  async reset(@Body() reset: ResetCustomerDto): Promise<PasswordResetRo> {
    await this.customersService.reset(reset);
    return {};
  }

  @Get('profile')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'token' })
  @ApiResponse({ status: 200, type: GetCustomerRo })
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT, AuthGuardsEnum.CUSTOMER_JWT)
  async getCustomerByJwt(
    @CustomersAuthCustomerDecorator() customer: Customer,
  ): Promise<GetCustomerRo> {
    return customer;
  }

  @Put('profile')
  @ApiHeader({ required: true, name: 'project-id' })
  @ApiHeader({ required: true, name: 'token' })
  @ApiResponse({ status: 200, type: UpdateCustomerRo })
  @Auth(AuthGuardsEnum.CUSTOMER_PROJECT, AuthGuardsEnum.CUSTOMER_JWT)
  async updateCustomerById(
    @CustomersAuthCustomerDecorator() customer: Customer,
    @Body() body: UpdateCustomerDto,
  ): Promise<UpdateCustomerRo> {
    return await this.customersService.updateCustomerById(customer._id, body);
  }
}
