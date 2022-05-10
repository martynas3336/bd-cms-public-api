import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop()
  id: string;

  @Prop({ default: 'new' })
  status: string;

  @Prop({})
  customerId: string;

  @Prop({})
  cartId: string;

  @Prop({})
  deliverId: string;

  @Prop({})
  paymentId: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
