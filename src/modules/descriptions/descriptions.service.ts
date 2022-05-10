import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Description } from './entities/description.entity';
import { Project } from '../project/entities/project.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class DescriptionsService {
  constructor(
    @InjectModel(ModelNamesEnum.DESCRIPTION)
    private readonly descriptionRepository: Model<Description>,
  ) {}

  async create(
    body: Partial<Description>,
    projectId: string,
    language: string,
  ) {
    return await new this.descriptionRepository({
      ...body,
      projectId,
      language,
    }).save();
  }

  async findOne(id: string) {
    return this.descriptionRepository.findOne({
      _id: id,
    });
  }

  async findByKeyAndVersion(
    project: Project,
    language: string,
    key: string,
    version: string,
  ) {
    return this.descriptionRepository.findOne({
      projectId: project._id,
      language,
      key,
      version,
      status: 'active',
    });
  }

  async findByKeys(
    project: Project,
    language: string,
    keysInput: string[] | string,
  ) {
    const keys = typeof keysInput === 'string' ? [keysInput] : keysInput;
    const descriptions = await this.descriptionRepository.find({
      projectId: project._id,
      language,
      key: { $in: keys },
    });
    // index descriptions
    const descriptionsIndexed = descriptions.reduce(
      (o: { [key: string]: Description[] }, description) => {
        if (!o[description.key]) o[description.key] = [];
        o[description.key].push(description);
        return o;
      },
      {},
    );
    // order descriptions
    Object.keys(descriptionsIndexed).forEach((key) => {
      descriptionsIndexed[key] = descriptionsIndexed[key].sort(
        (firstEl, secondEl) => {
          if (firstEl.version === secondEl.version) return 0;
          if (firstEl.version === 'latest') return -1;
          if (secondEl.version === 'latest') return 1;
          const firstVersionNum = Number(firstEl?.version?.slice(1)) || 0;
          const secondVersionNum = Number(secondEl?.version?.slice(1)) || 0;
          if (firstVersionNum === secondVersionNum) return 0;
          if (firstVersionNum < secondVersionNum) return 1;
          if (firstVersionNum > secondVersionNum) return -1;
        },
      );
    });
    const descriptionsRes = Object.keys(descriptionsIndexed).map(
      (key) => descriptionsIndexed[key][0],
    );
    return { items: descriptionsRes };
  }

  async update(id: string, body: Partial<Description>) {
    return this.descriptionRepository.updateOne(
      { _id: id },
      {
        ...body,
        modifiedAt: new Date(),
      },
    );
  }
}
