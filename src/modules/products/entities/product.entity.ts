import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  id: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ default: 'draft' })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  statusChangedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
