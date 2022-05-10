import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { ProductSchema } from './entities/product.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { DetailsSchema } from '../details/entities/details.entity';
import { VariationSchema } from '../variations/entities/variation.entity';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.PRODUCT, schema: ProductSchema }],
      ConnectionNamesEnum.main,
    ),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.DETAILS, schema: DetailsSchema }],
      ConnectionNamesEnum.main,
    ),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.VARIATION, schema: VariationSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
