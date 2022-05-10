import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common';

import { ErrorCodesEnum } from '@shopaffix/errors';
import { Exception } from './Exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const status = exception.errorHttpCode || 400;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const r = exception?.getResponse?.();
    const message = (r as any)?.message ?? '';

    // DTO errors
    if (exception instanceof BadRequestException) {
      const res = exception.getResponse();
      const msg = (res as any)?.message ?? message;
      response.status(status).json({
        errorCode: ErrorCodesEnum.ERROR_GLOBAL_BAD_REQUEST,
        message: msg,
      });
    } else if (exception instanceof Exception) {
      response.status(status).json({
        errorType: exception.errorType,
        errorInnerCode: exception.errorInnerCode,
        errorCode: exception.errorCode,
        message,
      });
    } else if (exception instanceof Error) {
      response.status(status).json({ error: exception.message, message });
    } else {
      response.status(status).json({ error: exception, message });
    }
  }
}
