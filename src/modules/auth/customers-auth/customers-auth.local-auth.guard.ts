import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthGuardsEnum } from '../../../enums/authGuards.enum';
import { MetaDataKeyEnum } from '../../../enums/metaDataKey.enum';

@Injectable()
export class CustomersAuthLocalAuthGuard extends AuthGuard('local') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const auth =
      this.reflector.get<keyof typeof AuthGuardsEnum>(
        MetaDataKeyEnum.AUTH,
        ctx.getHandler(),
      ) || new Array<keyof typeof AuthGuardsEnum>();
    if (auth.includes(AuthGuardsEnum.CUSTOMER_LOCAL)) {
      return super.canActivate(ctx);
    }
    return true;
  }
}
