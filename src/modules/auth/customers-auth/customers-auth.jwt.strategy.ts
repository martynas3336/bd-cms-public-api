import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from '../../../config';
import { Customer } from '../../customers/entities/customer.entity';
import { CustomersAuthJwtPayloadType } from './types/customers-auth.jwt-payload.type';
import { CustomersAuthService } from './customers-auth.service';

@Injectable()
export class CustomersAuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private customersAuthService: CustomersAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.customerJwtKey,
    });
  }

  async validate(jwtPayload: CustomersAuthJwtPayloadType): Promise<Customer> {
    const customer = this.customersAuthService.getCustomerById(jwtPayload.id);
    if (!customer) {
      throw new UnauthorizedException();
    }
    return customer;
  }
}
