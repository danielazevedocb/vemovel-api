import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response as ExpressResponse } from 'express';

@Catch(HttpException, BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<ExpressResponse>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors:
        exception instanceof BadRequestException &&
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
          ? (exceptionResponse as any).message
          : typeof exceptionResponse === 'object'
            ? exceptionResponse
            : { message: exceptionResponse },
    };

    response.status(status).json(errorResponse);
  }
}
