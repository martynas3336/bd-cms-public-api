import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Order } from './entities/order.entity';
import { ModelNamesEnum } from '../../enums/modelNames.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(ModelNamesEnum.ORDER)
    private readonly ordersRepository: Model<Order>,
    @InjectModel(ModelNamesEnum.CART)
    private readonly cartRepository: Model<Cart>,
    @InjectModel(ModelNamesEnum.CUSTOMER)
    private readonly customerRepository: Model<Customer>,
  ) {}

  async add(order: Partial<Order>, customerId: string) {
    const cart: Cart = await this.cartRepository.findOne({
      _id: order.cartId,
      customerId,
    });
    if (!cart) throw new Error('Cart does not exist');

    return await this.ordersRepository.create({
      customerId: customerId,
      cartId: order.cartId,
      deliverId: '',
      paymentId: '',
    });
  }

  async getAll(customerId: string) {
    const orders: Order[] = await this.ordersRepository.find({
      customerId,
    });
    return {
      items: orders,
    };
  }

  async getOne(orderId: string, customerId: string) {
    const order: Order = await this.ordersRepository.findOne({
      customerId,
      _id: orderId,
    });
    return order;
  }
}
