import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Details extends Document {
  @Prop()
  id: string;

  @Prop({})
  projectId: string;

  @Prop({})
  productId: string;

  @Prop({})
  language: string;

  @Prop({})
  description: string;

  @Prop({})
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const DetailsSchema = SchemaFactory.createForClass(Details);
