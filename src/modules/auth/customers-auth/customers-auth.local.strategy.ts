import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomersAuthService } from './customers-auth.service';
import { Customer } from '../../customers/entities/customer.entity';

@Injectable()
export class CustomersAuthLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private customersAuthService: CustomersAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Customer> {
    const customer =
      await this.customersAuthService.getCustomerByEmailAndPassword(
        email,
        password,
      );
    if (!customer) {
      throw new UnauthorizedException();
    }
    return customer;
  }
}
