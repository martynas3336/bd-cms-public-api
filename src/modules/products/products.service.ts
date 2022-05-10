import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { Details } from '../details/entities/details.entity';
import { Variation } from '../variations/entities/variation.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ModelNamesEnum.PRODUCT)
    private readonly productRepository: Model<Product>,
    @InjectModel(ModelNamesEnum.DETAILS)
    private readonly detailsRepository: Model<Details>,
    @InjectModel(ModelNamesEnum.VARIATION)
    private readonly variationRepository: Model<Variation>,
  ) {}

  async getProducts(projectId: string, language: string) {
    const products: Product[] = await this.productRepository.find({
      projectId,
      language,
    });

    return {
      itemsCount: products.length,
      items: products,
    };
  }

  async getProduct(projectId: string, productId: string) {
    const product: Product = await this.productRepository.findOne({
      _id: productId,
      projectId,
    });

    return product;
  }
}
