import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNamesEnum } from '../../../enums/modelNames.enum';
import { Model } from 'mongoose';
import { Customer } from '../../customers/entities/customer.entity';
import * as crypto from 'crypto';
import { config } from '../../../config';
import { CustomerStatusesEnum } from '../../../enums/customerStatuses.enum';
import { CustomerTypesEnum } from '../../../enums/customerTypes.enum';
import { CustomersAuthJwtPayloadType } from './types/customers-auth.jwt-payload.type';
import * as mongoose from 'mongoose';

@Injectable()
export class CustomersAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(ModelNamesEnum.CUSTOMER)
    private readonly customerRepository: Model<Customer>,
  ) {}

  async getCustomerByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<Customer | null> {
    const passwordHash: string = this.encryptPassword(password);
    const customer = await this.customerRepository.findOne({
      email,
      status: CustomerStatusesEnum.ACTIVE,
      passwordHash,
      type: CustomerTypesEnum.REGISTERED,
    });
    return customer || null;
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    if (!mongoose.isValidObjectId(id)) return null;
    const customer = await this.customerRepository.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return customer || null;
  }

  async login(customer: Customer) {
    const payload: CustomersAuthJwtPayloadType = { id: customer._id };
    return {
      accessToken: this.jwtSign(payload),
    };
  }

  jwtSign(data: string | object | Buffer) {
    return this.jwtService.sign(data);
  }

  encryptPassword(password: string) {
    const hash: crypto.Hmac = crypto.createHmac(
      'sha512',
      config.customerPasswordEncryptionKey,
    );
    hash.update(password);
    return hash.digest('hex');
  }
}
