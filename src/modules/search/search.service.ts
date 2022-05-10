import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../category/entities/category.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(ModelNamesEnum.CATEGORY)
    private readonly categoryRepository: Model<Category>,
  ) {}

  async categoriesParent(language: string, key: string) {
    const categories = await this.categoryRepository.find({
      language,
      categoryParent: key,
    });

    const items = categories.map((category) => category.categoryChild);
    return {
      items,
    };
  }

  async categoriesChild(language: string, key: string) {
    const categories = await this.categoryRepository.find({
      language,
      categoryChild: key,
    });

    const items = categories.map((category) => category.categoryParent);
    return {
      items,
    };
  }
}
