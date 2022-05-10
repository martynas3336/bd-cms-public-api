import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainSchema } from './entities/domain.entity';
import { ConnectionNamesEnum } from '../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.DOMAIN, schema: DomainSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
