import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './entities/cart.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.CART, schema: CartSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
