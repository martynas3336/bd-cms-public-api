import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './entities/customer.entity';
import { SendgridModule } from '../sendgrid/sendgrid.module';
import { EmailTemplatesModule } from '../email-templates/email-templates.module';

import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { AuthModule } from '../auth/auth.module';
import { CustomersAuthModule } from '../auth/customers-auth/customers-auth.module';

@Module({
  imports: [
    AuthModule,
    CustomersAuthModule,
    EmailTemplatesModule,
    SendgridModule,
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.CUSTOMER, schema: CustomerSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
