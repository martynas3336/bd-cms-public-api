import { SetMetadata } from '@nestjs/common';
import { MetaDataKeyEnum } from '../../enums/metaDataKey.enum';
import { AuthGuardsEnum } from '../../enums/authGuards.enum';

export const Auth = (...auth: Array<keyof typeof AuthGuardsEnum>) =>
  SetMetadata(MetaDataKeyEnum.AUTH, auth);
