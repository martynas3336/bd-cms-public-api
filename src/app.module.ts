import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { ConnectionNamesEnum } from './enums/connectionNames.enum';

// # API
import { CartModule } from './modules/cart/cart.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DescriptionsModule } from './modules/descriptions/descriptions.module';
import { DomainModule } from './modules/domain/domain.module';
import { EmailTemplatesModule } from './modules/email-templates/email-templates.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { SearchModule } from './modules/search/search.module';
import { SendgridModule } from './modules/sendgrid/sendgrid.module';
import { VariationsModule } from './modules/variations/variations.module';

// # AUTH
import { CustomersAuthJwtAuthGuard } from './modules/auth/customers-auth/customers-auth.jwt-auth.guard';
import { CustomersAuthLocalAuthGuard } from './modules/auth/customers-auth/customers-auth.local-auth.guard';
import { ProjectAuthGuard } from './modules/auth/project-auth/project-auth.guard';
import { CustomersProjectAuthGuard } from './modules/auth/customers-project-auth/customers-project-auth.guard';

import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(config.dbMongoString, {
      connectionName: ConnectionNamesEnum.main,
    }),
    // # API
    CartModule,
    CustomersModule,
    DescriptionsModule,
    DomainModule,
    EmailTemplatesModule,
    OrdersModule,
    ProductsModule,
    SearchModule,
    SendgridModule,
    VariationsModule,
  ],
  controllers: [AppController],
  providers: [
    // GUARDS
    {
      provide: APP_GUARD,
      useClass: ProjectAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CustomersAuthJwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CustomersAuthLocalAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CustomersProjectAuthGuard,
    },
    // ~~~
    AppService,
  ],
})
export class AppModule {}
