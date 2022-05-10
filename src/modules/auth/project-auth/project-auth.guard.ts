import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProjectNotFoundError } from '../../../exceptions/inner-errors/project.not.found.error';
import { ProjectAuthService } from './project-auth.service';
import { AuthGuardsEnum } from '../../../enums/authGuards.enum';
import { MetaDataKeyEnum } from '../../../enums/metaDataKey.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ProjectAuthGuard implements CanActivate {
  constructor(
    private readonly projectAuthService: ProjectAuthService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const auth =
      this.reflector.get<keyof typeof AuthGuardsEnum>(
        MetaDataKeyEnum.AUTH,
        ctx.getHandler(),
      ) || new Array<keyof typeof AuthGuardsEnum>();
    if (auth.includes(AuthGuardsEnum.CUSTOMER_PROJECT)) {
      const req = ctx.switchToHttp().getRequest();
      const projectId = req.get('project-id');
      if (!projectId) throw new ProjectNotFoundError();
      const project = await this.projectAuthService.getProjectByProjectId(
        projectId,
      );
      if (!project) throw new ProjectNotFoundError();
      req.project = project;
      return true;
    }
    return true;
  }
}
