import { Module } from '@nestjs/common';
import { DescriptionsService } from './descriptions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DescriptionSchema } from './entities/description.entity';
import { DescriptionsController } from './descriptions.controller';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.DESCRIPTION, schema: DescriptionSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [DescriptionsController],
  providers: [DescriptionsService],
})
export class DescriptionsModule {}
