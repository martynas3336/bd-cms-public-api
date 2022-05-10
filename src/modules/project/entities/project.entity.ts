import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { EmailConfirmTypesEnum } from '../../../enums/emailConfirmTypes.enum';

@Schema()
export class Project extends Document {
  @Prop()
  id: string;

  @Prop({ required: true, default: '' })
  name: string;

  @Prop({ required: false, default: '' })
  companyId: string;

  @Prop({ required: false, default: '' })
  emailConfirmUrl: string;

  @Prop({ required: false, default: EmailConfirmTypesEnum.CONFIRM_LINK })
  emailConfirmType: EmailConfirmTypesEnum;

  @Prop({ required: false, default: EmailConfirmTypesEnum.RAW_CODE })
  anonymousEmailConfirmType: EmailConfirmTypesEnum;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
