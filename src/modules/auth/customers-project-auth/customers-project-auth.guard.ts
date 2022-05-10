import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuardsEnum } from '../../../enums/authGuards.enum';
import { MetaDataKeyEnum } from '../../../enums/metaDataKey.enum';
import { Reflector } from '@nestjs/core';
import { Customer } from '../../customers/entities/customer.entity';
import { Project } from '../../project/entities/project.entity';

@Injectable()
export class CustomersProjectAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const auth =
      this.reflector.get<keyof typeof AuthGuardsEnum>(
        MetaDataKeyEnum.AUTH,
        ctx.getHandler(),
      ) || new Array<keyof typeof AuthGuardsEnum>();
    if (
      auth.includes(AuthGuardsEnum.CUSTOMER_PROJECT) &&
      (auth.includes(AuthGuardsEnum.CUSTOMER_JWT) ||
        auth.includes(AuthGuardsEnum.CUSTOMER_LOCAL))
    ) {
      const req = ctx.switchToHttp().getRequest();
      const customer: Customer = req.user;
      const project: Project = req.project;
      if (customer.projectId !== project._id.toString()) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }
}
