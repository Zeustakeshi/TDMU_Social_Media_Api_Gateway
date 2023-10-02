import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const data: any = exception.getError();
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response
            .status(data?.error?.status || HttpStatus.INTERNAL_SERVER_ERROR)
            .json(data.error || data);
    }
}
