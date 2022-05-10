import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CartProduct extends Document {
  @Prop()
  id: string;

  @Prop()
  price: number;

  @Prop()
  amount: number;
}

@Schema()
export class Cart extends Document {
  @Prop()
  id: string;

  @Prop()
  products: CartProduct[];

  @Prop({ required: true })
  projectId: string;

  @Prop({ default: 'new' })
  status: string;

  @Prop({ default: '' })
  customer: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
