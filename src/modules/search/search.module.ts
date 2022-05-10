import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../category/entities/category.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.CATEGORY, schema: CategorySchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
