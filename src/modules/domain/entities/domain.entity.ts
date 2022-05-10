import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Domain extends Document {
  @Prop()
  id: string;

  @Prop({ default: '' })
  domain: string;

  @Prop({ default: '' })
  projectId: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}
export const DomainSchema = SchemaFactory.createForClass(Domain);
