import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop()
  id: string;

  @Prop()
  url: string;
}

@Schema()
export class Variation extends Document {
  @Prop()
  id: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  lastUpdateAt: Date;

  @Prop({ default: '' })
  lastUpdateBy: string;

  @Prop({})
  projectId: string;

  @Prop({})
  productId: string;

  @Prop({})
  language: string;

  @Prop({})
  name: string;

  @Prop({})
  priceTax: number;

  @Prop({})
  priceRegular: number;

  @Prop({})
  isStock: boolean;

  @Prop({ default: false })
  noTax: boolean;

  @Prop({})
  quantity: number;

  @Prop({})
  companyProductId: string;

  @Prop({})
  barcode: string;

  @Prop({})
  category: string;

  @Prop({})
  gender: string;

  @Prop({})
  images: string[];

  @Prop({})
  imagesIds: string[];

  @Prop({})
  imagesPool: Image[];

  @Prop({})
  keyWords: string[];

  @Prop({ default: 0, required: true })
  ordering: number;
}

export const VariationSchema = SchemaFactory.createForClass(Variation);
