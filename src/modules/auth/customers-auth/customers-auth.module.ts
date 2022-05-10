import { Module } from '@nestjs/common';
import { CustomersAuthService } from './customers-auth.service';
import { PassportModule } from '@nestjs/passport';
import { CustomersAuthLocalStrategy } from './customers-auth.local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { CustomersAuthJwtStrategy } from './customers-auth.jwt.strategy';
import { config } from '../../../config';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNamesEnum } from '../../../enums/modelNames.enum';
import { CustomerSchema } from '../../customers/entities/customer.entity';
import { ConnectionNamesEnum } from '../../../enums/connectionNames.enum';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.customerJwtKey,
      signOptions: { expiresIn: '86400s' },
    }),
    MongooseModule.forFeature(
      [{ name: ModelNamesEnum.CUSTOMER, schema: CustomerSchema }],
      ConnectionNamesEnum.main,
    ),
  ],
  providers: [
    CustomersAuthService,
    CustomersAuthLocalStrategy,
    CustomersAuthJwtStrategy,
  ],
  exports: [
    CustomersAuthService,
    CustomersAuthLocalStrategy,
    CustomersAuthJwtStrategy,
  ],
})
export class CustomersAuthModule {}
