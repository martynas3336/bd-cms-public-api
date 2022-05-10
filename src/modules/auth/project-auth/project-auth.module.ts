import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from '../../project/entities/project.entity';
import { ConnectionNamesEnum } from '../../../enums/connectionNames.enum';
import { ModelNamesEnum } from '../../../enums/modelNames.enum';
import { ProjectAuthService } from './project-auth.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.PROJECT, schema: ProjectSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  providers: [ProjectAuthService],
  exports: [ProjectAuthService],
})
export class ProjectAuthModule {}
