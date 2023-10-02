import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configs from './configs/configuration';
import defaultMiddleware from './middlewares/default.middleware';
import { AppExceptionFilter } from './common/exceptions/app.exception.filter';
import { ResponseFormatterInterceptor } from './common/interceptors/responseFormater.interceptor';
import { RpcExceptionFilter } from './common/exceptions/rpc.exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: process.env.CLIENT_ORIGIN_URL,
        },
    });
    defaultMiddleware(app);

    app.useGlobalInterceptors(new ResponseFormatterInterceptor());
    app.useGlobalFilters(new AppExceptionFilter());
    app.useGlobalFilters(new RpcExceptionFilter());

    // base endpoint
    app.setGlobalPrefix('/api/v1');

    const { port, evironment } = configs;
    await app.listen(port || 3000, () => {
        console.log(
            `Server: 
            |--- Port: ${port || 3000}
            |--- Running on ${evironment}
            |--- Make something great! 😇`,
        );
    });
}
bootstrap();
