import './dotenv';
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/exception.filter';
import { Request, Response, NextFunction } from 'express';

// # API
import { CartModule } from './modules/cart/cart.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DescriptionsModule } from './modules/descriptions/descriptions.module';
import { DomainModule } from './modules/domain/domain.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { SearchModule } from './modules/search/search.module';
import { SendgridModule } from './modules/sendgrid/sendgrid.module';
import { VariationsModule } from './modules/variations/variations.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header('Cache-Control', 'no-cache');
    res.header('Pragma', 'no-cache');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  // ### API SWAGGER ###
  const configForClient = new DocumentBuilder()
    .setTitle('Hyper Deep Pool - Client')
    .setDescription(
      `New data structure ! DTOs + Entities, Changes in: [Products: GET, UPDATE, DELETE], version - ${new Date()}`,
    )
    .setVersion('1.000.1')
    .addTag(`${new Date()}`)
    .build();

  const documentForClient = SwaggerModule.createDocument(app, configForClient, {
    include: [
      CartModule,
      CustomersModule,
      DescriptionsModule,
      DomainModule,
      OrdersModule,
      ProductsModule,
      SearchModule,
      SendgridModule,
      VariationsModule,
    ],
  });
  SwaggerModule.setup('api/v1/swagger', app, documentForClient);
  // ~~~~~~

  app.use(helmet());
  app.enableCors({
    exposedHeaders: 'new-token',
  });
  await app.listen(config.port).then(() => {
    console.log(`Application started. Listening port ${config.port}`);
  });
}
bootstrap().then();
