import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Description extends Document {
  @Prop()
  id: string;

  @Prop()
  language: string;

  @Prop()
  key: string;

  @Prop()
  value: string;

  @Prop()
  projectId: string;

  @Prop({ default: 'v1' })
  version: string;

  @Prop({ default: 'inactive', enum: ['active', 'inactive', 'deleted'] })
  status: string;

  @Prop({ default: '' })
  modifiedBy: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  modifiedAt: Date;
}
export const DescriptionSchema = SchemaFactory.createForClass(Description);
