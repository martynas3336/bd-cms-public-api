import { Module } from '@nestjs/common';
import { VariationsService } from './variations.service';
import { VariationsController } from './variations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { ProductSchema } from '../products/entities/product.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { DetailsSchema } from '../details/entities/details.entity';
import { VariationSchema } from './entities/variation.entity';

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
  providers: [VariationsService],
  controllers: [VariationsController],
})
export class VariationsModule {}
