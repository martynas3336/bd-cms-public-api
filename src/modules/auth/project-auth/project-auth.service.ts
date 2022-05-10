import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Project } from '../../project/entities/project.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNamesEnum } from '../../../enums/modelNames.enum';
import * as mongoose from 'mongoose';

@Injectable()
export class ProjectAuthService {
  constructor(
    @InjectModel(ModelNamesEnum.PROJECT)
    private readonly projectRepository: Model<Project>,
  ) {}

  async getProjectByProjectId(projectId: string): Promise<Project | null> {
    if (!mongoose.isValidObjectId(projectId)) return null;
    const project = await this.projectRepository.findOne({
      _id: new mongoose.Types.ObjectId(projectId),
    });
    return project || null;
  }
}
