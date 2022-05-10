import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './entities/order.entity';
import { CartSchema } from 'src/modules/cart/entities/cart.entity';
import { CustomerSchema } from 'src/modules/customers/entities/customer.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.ORDER, schema: OrderSchema }],
      ConnectionNamesEnum.main,
    ),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.CUSTOMER, schema: CustomerSchema }],
      ConnectionNamesEnum.main,
    ),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.CART, schema: CartSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
