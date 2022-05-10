import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ProjectAuthProjectDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.project;
  },
);
