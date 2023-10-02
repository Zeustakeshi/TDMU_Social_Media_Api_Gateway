import { Injectable } from '@nestjs/common';
import { ClientOptions, Transport } from '@nestjs/microservices';

export enum ServiceName {
    AUTH_SERVICE = 'AUTH_SERVICE',
    USER_SERVICE = 'USER_SERIVCE',
    POST_SERVICE = 'POST_SERVICE',
}

@Injectable()
export class RegistryService {
    private readonly envConfig: { [key: string]: ClientOptions };
    constructor() {
        this.envConfig = {};
        this.envConfig[ServiceName.AUTH_SERVICE] = {
            options: {
                port: parseInt(process.env.AUTH_SERVICE_PORT),
                host: process.env.AUTH_SERVICE_HOST,
            },
            transport: Transport.TCP,
        };
        this.envConfig[ServiceName.USER_SERVICE] = {
            options: {
                port: process.env.USER_SERVICE_PORT,
                host: process.env.USER_SERVICE_HOST,
            },
        };
        this.envConfig[ServiceName.POST_SERVICE] = {
            options: {
                port: process.env.POST_SERVICE_PORT,
                host: process.env.POST_SERVICE_HOST,
            },
        };
    }

    get(key: ServiceName): ClientOptions {
        return this.envConfig[key];
    }
}
