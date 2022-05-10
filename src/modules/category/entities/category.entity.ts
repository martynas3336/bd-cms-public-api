import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop()
  id: string;

  @Prop()
  projectId: string;

  @Prop({ default: '', required: true })
  categoryParent: string;

  @Prop({ required: true })
  categoryChild: string;

  @Prop({ required: true })
  language: string;

  @Prop({ default: '' })
  nameEnglish: string;

  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: [] })
  images: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
