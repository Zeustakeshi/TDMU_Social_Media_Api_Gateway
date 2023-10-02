import {
    CallHandler,
    ExecutionContext,
    HttpException,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ServiceResponseType } from '../types/response/serviceReponse.interface';
import { RpcException } from '@nestjs/microservices';

export class ResponseFormatterInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();

        return next.handle().pipe(
            map((data: ServiceResponseType) => {
                response.status(data.status);
                return {
                    status: data.status,
                    mess: 'ok',
                    serviceName: data.serviceName,
                    body: {
                        data: data.body.data,
                        error: data.body.error,
                    },
                };
            }),
            catchError((error) => {
                return throwError(() => new RpcException(error));
            }),
        );
    }
}
