import { Injectable } from '@nestjs/common';
import { CartTypes } from './types/cart.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './entities/cart.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(ModelNamesEnum.CART)
    private readonly cartRepository: Model<Cart>,
  ) {}

  async upsert(cartBody: CartTypes, project: Project, customerId: string) {
    if (!cartBody.cartId) {
      const newCart: Cart = await this.cartRepository.create({
        ...cartBody,
        projectId: project._id,
        customerId,
      });
      return newCart;
    }

    const updatedCart: Cart = await this.cartRepository
      .findOneAndUpdate(
        { _id: cartBody.cartId },
        {
          products: cartBody.products,
        },
      )
      .exec();
    return updatedCart;
  }

  async getByCartId(cartId: string, customerId: string) {
    const cart: Cart = await this.cartRepository.findOne({
      _id: cartId,
      customerId,
    });
    return cart;
  }
}
