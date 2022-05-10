import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Domain } from './entities/domain.entity';
import { Model } from 'mongoose';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel(ModelNamesEnum.DOMAIN)
    private readonly domainRepository: Model<Domain>,
  ) {}

  create() {
    return 'This action adds a new domain';
  }

  async getProjectInfoByDomain(domain: string) {
    const res: Domain = await this.domainRepository.findOne({ domain });
    return res;
  }
}
