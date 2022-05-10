import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../products/entities/product.entity';
import { Details } from '../details/entities/details.entity';
import { Variation } from './entities/variation.entity';
import { ProductsModuleError } from 'src/exceptions/inner-errors/products.module.error';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class VariationsService {
  constructor(
    @InjectModel(ModelNamesEnum.PRODUCT)
    private readonly productRepository: Model<Product>,
    @InjectModel(ModelNamesEnum.DETAILS)
    private readonly detailsRepository: Model<Details>,
    @InjectModel(ModelNamesEnum.VARIATION)
    private readonly variationRepository: Model<Variation>,
  ) {}

  async search(
    projectId: string,
    keywordsInput: string[] | string,
    language: string,
  ) {
    const keywords =
      typeof keywordsInput === 'string' ? [keywordsInput] : keywordsInput;

    const variations: Variation[] = await this.variationRepository.find({
      projectId: projectId,
      language: language.toLocaleLowerCase(),
      keyWords: { $all: keywords },
    });

    const matches = new Array<{
      productId: string;
      variationId: string;
      productName: string;
      description: string;
      images: string[];
      priceTax: number;
      priceRegular: number;
      keyWords: string[];
      ordering: number;
    }>();
    await Promise.all(
      variations.map(async (variation: Variation) => {
        const product: Product = await this.productRepository.findOne({
          _id: variation.productId,
        });

        const details: Details = await this.detailsRepository.findOne({
          productId: variation.productId,
        });
        matches.push({
          productId: product._id,
          variationId: variation._id,
          productName: variation.name,
          description: details?.description || '',
          images: variation.images,
          priceTax: variation.priceTax,
          priceRegular: variation.priceRegular,
          keyWords: variation.keyWords,
          ordering: variation.ordering,
        });
      }),
    );

    return {
      itemsCount: matches.length,
      items: matches,
    };
  }

  async getProducts(projectId: string, keys: string[], language: string) {
    const products: Product[] = await this.productRepository.find({
      projectId,
    });

    const productsFormated = new Array<{
      id: string;
      status: string;
      productName: string;
      description: string;
      variation: Variation;
    }>();
    await Promise.all(
      products.map(async (product: Product) => {
        const variations: Variation[] = await this.variationRepository.find({
          projectId: projectId,
          productId: product._id,
          language: language.toLocaleLowerCase(),
        });

        const detail: Details = await this.detailsRepository.findOne({
          language: language.toLocaleLowerCase(),
          productId: product._id,
          projectId,
        });

        variations.map((variation: Variation) => {
          productsFormated.push({
            id: product._id,
            status: product.status,
            productName: detail?.name || '',
            description: detail?.description || '',
            variation: variation,
          });
        });
      }),
    );

    return {
      itemsCount: productsFormated.length,
      items: productsFormated,
    };
  }

  async getProduct(projectId: string, variationId: string) {
    const variation: Variation = await this.variationRepository.findOne({
      _id: variationId,
    });

    const product: Product = await this.productRepository.findOne({
      _id: variation.productId,
    });

    if (product.status === 'active') {
      const details: Details = await this.detailsRepository.findOne({
        language: variation.language,
        productId: variation.productId,
      });

      return {
        item: {
          variationId,
          productName: variation.name,
          description: details?.description || '',
          language: variation.language,
          variationName: variation.name,
          images: variation.images,
          priceTax: variation.priceTax,
          priceRegular: variation.priceRegular,
        },
      };
    }

    throw new ProductsModuleError();
  }
}
