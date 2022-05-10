import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CustomerTypesEnum } from '../../../enums/customerTypes.enum';
import { CustomerStatusesEnum } from '../../../enums/customerStatuses.enum';

class CompanyDetails {
  @Prop({})
  companyName: string;

  @Prop({})
  companyLegalCode: string;

  @Prop({})
  companyTaxCode: string;

  @Prop({})
  country: string;

  @Prop({})
  city: string;

  @Prop({})
  localAdministration: string;

  @Prop({})
  street: string;

  @Prop({})
  house: string;

  @Prop({})
  flat: string;

  @Prop({})
  postCode: string;
}

@Schema()
export class Customer extends Document {
  @Prop()
  id: string;

  @Prop({})
  projectId: string;

  @Prop({ default: CustomerStatusesEnum.INACTIVE })
  status: CustomerStatusesEnum;

  @Prop({})
  code: string;

  @Prop({})
  name: string;

  @Prop({})
  surname: string;

  @Prop({})
  email: string;

  @Prop({})
  phone: string;

  @Prop({})
  passwordHash: string;

  @Prop({})
  country: string;

  @Prop({})
  city: string;

  @Prop({})
  localAdministration: string;

  @Prop({})
  street: string;

  @Prop({})
  house: string;

  @Prop({})
  flat: string;

  @Prop({})
  postCode: string;

  @Prop({})
  companyDetails: CompanyDetails;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  modifiedAt: Date;

  @Prop({ type: Date, default: Date.now })
  codeExpire: Date;

  @Prop({ type: Date, default: Date.now })
  passwordResetDate: Date;

  @Prop({})
  type: CustomerTypesEnum;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
